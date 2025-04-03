#en este archivo configuramos el modelo producto para la bd
from sqlalchemy import Column, Integer, String, Float
from config.database import Base

class product(Base):

    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
    category = Column(String)
    description = Column(String)
    image_url = Column(String, nullable=True)
