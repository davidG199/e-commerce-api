from typing import List
from fastapi import APIRouter
from schemas.products import Product
from config.database import Session
from services.products import ProductService
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

product_router = APIRouter(prefix="/products", tags=["product"])

@product_router.post("/new-product", response_model=dict, status_code=201)
def new_product(product: Product) -> dict:
    db = Session()
    ProductService(db).create_product(product)
    return JSONResponse(status_code=200, content={"mensaje": "Producto creado correctamente"})

@product_router.get("/",response_model=List[Product], status_code=200)
def get_products() -> List:
    db = Session()
    result = ProductService(db).get_products()

    if result:
        return JSONResponse(status_code=200, content=jsonable_encoder(result))
    else:
        return JSONResponse(status_code=200, content={"mensaje": "No hay productos"})

@product_router.get("/id/{id}", response_model=dict, status_code=200)
def get_product_by_id(id: int) -> dict:
    db = Session()
    result = ProductService(db).get_product_by_id(id)

    if result:
        return JSONResponse(status_code=200, content=jsonable_encoder(result))
    else:
        return JSONResponse(status_code=404, content={"mensaje": "Producto no encontrado"})





