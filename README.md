<h1 align="center">
  <a href="https://desafio-bsale-back-begazo.herokuapp.com/docs/">
    Dedsafío Bsale - Backend
  </a>
</h1>

Este repositorio esta enfocada para el lado Backend del proyecto. Esta desarrollado con nodejs y Express, con una documentación bien organizada, con el cual se hace la conexión a la base de datos y se crea los endpoint para que el front pueda usarlos para las consultas necesarias 

## Comenzando 🚀

Para poder correr este proyecto, solo debe clonar este repositorio, luego instalar las dependencias del proyecto

```
npm install
```
Y por último levantar el servidor de node, el cual esta en el puerto 3000. 
```
npm run inventory
```

_Solo si el puerto 3000 ya está en uso, por otro proceso, puedes dirigirte al archivo keys.js que se encuentra en la raíz del proyecto, y cambiar en la linea 1, por el puerto que desses asignarle, (ejemplo 8000)_

```
let port = 8000;
```

Entonces se podrá acceder a la api, tomando como default, el puerto 3000.
  - De forma local, mediante la url, "http://localhost:3000/inventory"
  - De forma desplegada en Heroku, mediante la url, "https://desafio-bsale-back-begazo.herokuapp.com/"

Cuando acceda a una de las anteriores url, saldrá el siguiente mensaje, eso siginifica que el servidor a sido levantado correctamente.
```
Cannot GET /inventory
```

## Estrcutra de ficheros del Proyecto

  - Tenemos keys.js, donde se declara las variables de entorno local o desplegado (se asigno las variables de entorno en Heroku).

  - Se aclara, que se declaro como nombre del serivico y como una carpeta raiz, Inventory, ya que si se desa escalar el sistema, este este lo mas ordenado y comprensible para el desarrollador.

  #### Services/Inventory

  `index.js` Se crea el servidor , y se usa consign, para la separación lógica de archivos y la carga automática de scripts.

  ##### routes
  - Se declara las rutas ha implementar, se documentaron las 2 primaeras rutas con Swagger, por obvias razones de tiempo, ya que solo documentar 2 funciones toma alrededor de 80 lineas.

  - Se requiere el index de los controllers
  
  ##### controllers

  - `index.js`, se indexa los diferentes controladores.
  - Se encuentran las funciones de los controladores para las peticiones asociadas agrupadas en algo común, donde se llama la funcion asincrona del controller del database de Inventory, luego llama a responseServerDataList(processStatus, listDataApplyFilters, 'Filters', 'List'), y lo que devuelve manda como response a la petición del endpoint

  ##### lib

  - Se agregan los middlewares que usará express, como morgan solo en modo desarrollo , cors, y el de Swagger
  -SwaggerOption, los valores que necesita Swagger para que funcione la ruta /docs correctamente.
  
----------------------------------------------------------------------------------------------------------------------------

  #### database

  `index.js` Se crea la conexión con la base de datos con los valores establecido en key.js, y se asocian las diversos funciones asincronas con sus respectivos argumentos, que luego cada una llamará a una función asyncrono, dentro de la carpeta controllers

  ##### controllers/inventory/index.js

  Se encuentra la lógica que tendrá al hacer la petición de la consulta a la base de datos y la data que retornará la devolverá al controller del servicio (services/inventory/controllers/nameFolder/nameFile)


