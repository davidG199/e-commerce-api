from models.products import product as ModelProduct
from schemas.products import Product


class ProductService():

    def __init__(self, db) -> None:
        self.db = db

    def create_product(self, product: Product):
        new_product = ModelProduct(**product.model_dump())
        self.db.add(new_product)
        self.db.commit()
        self.db.refresh(new_product)
        return new_product
    
    def get_products(self):
        return self.db.query(ModelProduct).all()
    
    def get_product_by_id(self, id: int):
        result = self.db.query(ModelProduct).filter(ModelProduct.id == id).first()
        return result

