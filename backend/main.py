from fastapi import FastAPI
from fastapi.responses import  HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from config.database import Base, engine
from routers.user import user_router
from routers.products import product_router

#iniciamos fastapi y lo guardamos en la variable app
app = FastAPI()

#le damos un titulp
app.title = "e-commerce-api"
#le damos la version de la api
app.version = "0.0.1"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todas las cabeceras
)

#configuramos y creamos la bd
Base.metadata.create_all(bind=engine)

#incluimos nuestro archivo con los endpoints de los usuarios
app.include_router(user_router)

app.include_router(product_router)

#iniciamos nuestra api en su raiz
@app.get("/", tags=["root"])
def message():
    return HTMLResponse("<h1>e-commerce-api<h1/>")