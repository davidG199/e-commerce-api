from fastapi import UploadFile
from models.products import product as ModelProduct
# from schemas.products import Product
import os
import shutil

UPLOAD_FOLDER = "Imagenes_productos/"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class ProductService():

    def __init__(self, db) -> None:
        self.db = db

    def create_product(self, product_data: dict, image_file: UploadFile = None):

        # Manejo de la imagen
        image_url = None
        if image_file:
            file_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image_file.file, buffer)
            image_url = f"http://localhost:8000/{file_path}"

        new_product = ModelProduct(**product_data)  
        new_product.image_url = image_url

        self.db.add(new_product)
        self.db.commit()
        self.db.refresh(new_product)
        
        return new_product
    
    def get_products(self):
        return self.db.query(ModelProduct).all()
    
    def get_product_by_id(self, id: int):
        result = self.db.query(ModelProduct).filter(ModelProduct.id == id).first()
        return result

