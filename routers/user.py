#en este archivo configuramos los endpoints correspondientes a los usuarios
from typing import List
from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse
from config.database import Session
from schemas.users import User
from services.user import UserService

user_router = APIRouter(prefix="/user", tags=["user"])

#obtenemos todos los usuarios en la bd
@user_router.get("/", response_model=List[User], status_code=200)
def get_users() -> JSONResponse:
    db = Session()
    result = UserService(db).get_users()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

#funcion para crear los usuarios
@user_router.post("/create-user", response_model=dict, status_code=201)
def create_user(user: User) -> JSONResponse:
    db = Session()
    #verificamos si el usuario ya existe segun su email
    email_user = UserService(db).get_user_by_email(user.email)
    if email_user: #si ya existe un email registrado tira un error
        raise HTTPException(status_code=400, detail="Email ya ha sido registrado")

    #si no encuentra el email, entonces llama al serivicio para crear un usuario
    UserService(db).create_user(user)
    return JSONResponse(status_code=201, content={"message": "Usuario creado correctamente"})



