#en este archivo vamos a tener todas las funciones necesarias para el correcto funcionamiento
#de nuestros endpoints, las separamos en este archivo para mejor organizacion
from models.users import User as UserModel
from schemas.users import User

class UserService():

    def __init__(self, db) -> None:
        self.db = db

    #obtener todos los usuarios
    def get_users(self):
        result = self.db.query(UserModel).all()
        return result

    #crear usuario
    def create_user(self, user: User):
        new_user = UserModel(**user.model_dump())
        self.db.add(new_user)
        self.db.commit()
        return new_user

    #buscar usuario segun su email
    def get_user_by_email(self, email: str):
        return self.db.query(UserModel).filter(UserModel.email == email).first()


