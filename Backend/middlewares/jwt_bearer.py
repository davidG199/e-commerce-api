from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from models.users import User as UserModel
from config.database import Session
from utils.jwt_manager import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

SECRET_KEY = "SECRET_KEY"
ALGORITHM = "HS256"

def current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = verify_access_token(token)
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        db = Session()

        user = db.query(UserModel).filter(UserModel.id == int(user_id)).first()
        if user is None:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail={"Invalid token": e})
