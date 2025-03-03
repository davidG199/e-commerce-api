#En este archivo creamos la configuracion a la base de datos, la cual es un orm llamado sqlalchemy
#Esto creara un archivo sqlite en la raiz de nuestro proyecto

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import sessionmaker

#le damos el nombre al archivo donde estara nuestra bd
sqlite_file_name = "../database.sqlite"

#esta linea garantiza que la bd funcione correctamente en cualquier directorio donde se ejecute el script
base_dir = os.path.dirname(os.path.realpath(__file__))

#recogemos toda la ruta de nuestra bd
database_url = f"sqlite:///{os.path.join(base_dir, sqlite_file_name)}"

#con esto terminamos de configurar nuesta bd
engine = create_engine(database_url, echo=True)

#configuraciones finales
Session = sessionmaker(bind=engine)

Base = declarative_base()

