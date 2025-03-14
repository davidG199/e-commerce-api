#en este archivo vamos a tener todas las funciones necesarias para el correcto funcionamiento
#de nuestros endpoints, las separamos en este archivo para mejor organizacion
from passlib.context import CryptContext

from models.users import User as UserModel
from schemas.users import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService():

    def __init__(self, db) -> None:
        self.db = db

    #obtener todos los usuarios
    def get_users(self):
        result = self.db.query(UserModel).all()
        return result

    #buscar usuario segun su email
    def get_user_by_email(self, email: str):
        return self.db.query(UserModel).filter(UserModel.email == email).first()

    def hash_password(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    # crear usuario
    def create_user(self, user: User):
        hashed_password = self.hash_password(user.password)
        new_user = UserModel(**user.model_dump())
        new_user.password = hashed_password
        self.db.add(new_user)
        self.db.commit()
        return new_user

    #autenticacion de usuario para login
    def authenticate_user(self, email: str, password: str):
        user = self.get_user_by_email(email)
        if not user or not self.verify_password(password, user.password):
            return False
        return user


