#aqui creamos el esquema de los productos para la bd
from typing import Optional
from pydantic import BaseModel, Field

class Product(BaseModel):
    id: Optional[int] = None
    name: str = Field(min_length=2, max_length=20)
    price: float = Field(ge=1, le=1000000000)
    quantity: int = Field(ge=0, le=10000)
    category: str = Field(min_length=1, max_length=20)
    description: str = Field(min_length=15, max_length=100)

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "example_product",
                    "price": 100,
                    "quantity": 100,
                    "category": "example_category",
                    "description": "example_description"
                }
            ]
        }
    }





