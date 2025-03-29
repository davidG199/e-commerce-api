#en este archivo configuramos el modelo del usuario para la bd
from sqlalchemy import Column, Integer, String
from config.database import Base

class User(Base):

    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    type = Column(String)