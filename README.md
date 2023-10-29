# Notas sobre creación de Backend

- Creamos en la carpeta `models` el archivo `server.js` que contiene la clase donde definiremos los path, las rutas, los middlewares y el listen
- Para trabajar con la base de datos:
  - Crear un archivo `config.js` dentro de una carpeta database donde definimos la función que conectará con la base de datos de `MongoDB Atlas`.
  - Crear la función conectarDB en la clase `server` para poder llamarla en el constructor.
- Para crear colecciones en la base de datos se repiten estos pasos en cada una:
  - Crear modelo de la colección usando `Schema` de `Mongoose`
  - Crear Controlador de las rutas donde realizaremos las acciones según los métodos de la petición (GET, POST, PUT,DELETE)
  - Crear las rutas de la api para poder traer datos, crear datos, actualizar datos y borrar datos. Debemos asignarle las funciones creadas en el controlador. En este archivo de las rutas usaremos las validaciones con `express-validators`.
- Para la autenticación no necesitamos crear un modelo, solo la ruta y el controlador con el método `POST`. Usaremos `jsonwebtoken` para generar el token una vez se valida la info. Creamos en la carpeta `helpers` un archivo `generar-jwt.js` que se encargará de generar el token. Importamos el archivo para usar la función en el controlador.

### Para qué sirve la carpeta helpers

- En esta carpeta creamos funciones de javascript que son útiles para nuestros custom check de validación y para generar el token con `jwt`.
  - Los archivos que creamos allí son: `db-validators.js` (funciones para custom checks) y `generar-jwt.js` (Función que retorna una promesa donde se genera el token de autenticación)

### Para qué sirve la carpeta Middlewares

- En esta carpeta creamos archivos que contienen las funciones especiales que usaremos para validaciones donde necesitamos recibir la petición del cliente y retornar la respuesta del servidor.
  - El archivo `validar-campos.js` nos sirve para almacenar los errores generados por los checks de validación de las rutas y poder mostrarlos.
  - El archivo `validar-jwt.js` nos sirve para validar si el token que se envia del cliente es correcto.
  - El archivo `validar-role.js` nos sirve para validar si el rol del usuario es el permitido para realizar las peticiones que se están requiriendo desde el cliente.

### Para que sirve el archivo .env

- Este archivo nos sirve para definir variables de entorno que podremos utilizar desde cualquier archivo del proyecto con la propiedad `process.env`.
- Para poder trabajar con el tenemos que tener instalada la librería `dotenv` y configurada en el archivo `index.js`

### Para qué sirve el archivo .gitignore

- Este archivo lo utilizamos para especificar que carpetas o archivos no deben tener un seguimiento de Git ni subirse a Github.
  - Agregamos la carpeta `node_modules` y el archivo `.env`
