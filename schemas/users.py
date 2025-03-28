#aqui creamos el esquema de los usuarios para la bd
from typing import Optional
from pydantic import BaseModel, Field


class User(BaseModel):
    id: Optional[int] = None
    username: str = Field(min_length=2, max_length=25)
    email: str = Field(min_length=2, max_length=30)
    password: str = Field(min_length=2, max_length=20)
    type: str = Field(min_length=2, max_length=10)

    model_config = {
        'json_schema_extra':{
            'examples': [
                {
                    'username': 'example_user',
                    'email': 'example_email@example.com',
                    'password': 'example_password',
                    'type': 'example_type',
                }
            ]
        }
    }

