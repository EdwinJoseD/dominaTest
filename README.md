# DominaTest

Este proyecto está diseñado para ejecutarse con Nodejs, MongoDb de lado del backend, reactJS
de lado del frontend. Para ponerlo en funcionamiento, siga las instrucciones a continuación.

### Requisitos previos

- [Node.js](https://nodejs.org/en/download/) (versión recomendada: 18.x o superior)
- [npm](https://www.npmjs.com/) (versión recomendada: 8.x o superior)

### Variables de entorno

Aclaro que para efectos de prueba y por ser un repositorio privado dejo expuestas las credenciales a base de datos.
Para los poryectos **backAuth** y **backTodo** se necesitan las siguientes variables de entorno par su ejecucion en local:

**backAuth**
**PORT**=3333

**JWT_SECRET**=secret

**PREFIX**=/back-auth
**MONGO_URI**=mongodb+srv://dominauser:dominapass@domina.cgxwp.mongodb.net/?retryWrites=true

**backTodo**
**PORT**=3334

**JWT_SECRET**=secret

**PREFIX**=/back-todo
**MONGO_URI**=mongodb+srv://dominauser:dominapass@domina.cgxwp.mongodb.net/?retryWrites=true

**URI_AUTH**=http://localhost:3333/back-auth/api/auth

### Instalación

Instalar las dependencias:

```sh
git https://github.com/EdwinJoseD/dominaTest.git
cd dominaTest
npm install && npm run install
```

### Ejecución

Para iniciar el proyecto en modo desarrollo, utilice el siguiente comando:

```sh
npm run dev
```

### Compilación

Para generar compilado de microservicio, utilice el siguiente comando:

```sh
npm run build
```

Para ejecutar pruebas unitarias, utilice el siguiente comando:

```sh
npm run test
```

### Acceso a Swagger

#### Ejecucion en ambiente local

Una vez que el servidor esté en funcionamiento, puede acceder a la documentación de Swagger en:

```
http://localhost:3333/back-auth/api-docs
http://localhost:3334/back-todo/api-docs
```
