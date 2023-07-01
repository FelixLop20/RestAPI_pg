# RestAPI_pg

Este es un proyecto de API RESTful para administrar tareas utilizando Express.js y PostgreSQL como base de datos, este proyecto contiene los scripts, con
las tablas, inserts de inicialización y el .env, necesario para el funcionamiento.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta el comando `npm install` para instalar las dependencias necesarias.

## Configuración de la base de datos

Antes de ejecutar la API, asegúrate de configurar correctamente la conexión a la base de datos PostgreSQL. Puedes hacerlo siguiendo estos pasos:

1. Crea una base de datos en PostgreSQL para el proyecto.
2. Actualiza los detalles de conexión a la base de datos en el archivo `config.js` ubicado en la carpeta `src/config`.
3. Actualiza los datos de conexión del arcivo `.env.example`

## Manejo de Errores

En caso de producirse un error en la API, se devolverá una respuesta JSON, status enviará el codigo de estado,
message, será para describir el mensaje de error que devuelva el server
y el código el el code HTTP ejemplo: code 500, 400 etc...

```json
{
  "status": [código de estado HTTP],
  "message": [mensaje de error] || "Internal Server Error",
  "code": [código de error]
}
```

## Respuestas Exitósas

Este Primer json con respuesta de exito, se envía  únicamente cuando se realizó una request que no necesia datos 
en la respuesta, por ejemplo si fué exitosa, envía el status codigo 200, y un mensaje "Tarea Edita"

```json
{
  "status": [código de estado HTTP],
  "message": [mensaje de éxito],
}
```

En este segundo ejemplo de respuestas de exito, se envía un atributo más que es el "data", para retornar los datos que
solicta el cliente.

```json
res.status(200).json({
  "message": "OK",
  "data": datos
});
```

## Respuesta de bad_request

En este caso la respuesta es un bad request, que nos indica que algo está haciendo mal el cliente, 
por ejemplo editando una tarea poniendola en proceso, sin tener un colaborador.

```json
res.status(400).json({
  "status": "Bad Request",
  "message": [mensaje de error] 
});

```


