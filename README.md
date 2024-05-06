# Proyecto Node.js con MongoDB en Docker

Este proyecto proporciona una aplicación Node.js que interactúa con una base de datos MongoDB. Utiliza Docker y Docker Compose para gestionar los servicios de manera sencilla.

El IDE utilizado para este proyecto fue: VSCode.

## Características

- **MongoDB**: Base de datos con datos iniciales.
- **Node.js**: Aplicación web en Express.
- **Endpoints REST**:
  - `GET /users`: Obtiene todos los usuarios.
  - `GET /users/search`: Busca usuarios según criterios específicos.
  - `PUT /users/:id`: Actualiza un usuario si existe o crea uno nuevo con un ID específico.
  - `DELETE /users/:id`: Elimina un usuario por su ID.

## Estructura del Proyecto

```plaintext
project-root/
│
├── mongodb/
│   └── init-db.js
│
├── node-app/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── index.js
│
├── .gitignore
└── docker-compose.yml
```

## Descripción de los Archivos

- **mongodb/init-db.js:** Script para inicializar MongoDB con datos iniciales.
- **node-app/Dockerfile:** Dockerfile para construir la aplicación Node.js.
- **node-app/package.json:** Archivo de dependencias para la aplicación Node.js.
- **node-app/index.js:** Código de la aplicación Node.js.
  docker-compose.yml: Archivo de configuración para Docker Compose.
- **.gitignore:** Archivos y carpetas ignorados en Git.

## Configuración Inicial

### Prerrequisitos

- Docker
- Docker Compose

### Instrucciones de Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/SebasAB/mongo-nodejs-docker.git

cd mongo-nodejs-docker
```

2. Iniciar los servicios utilizando **_docker compose_**

```bash
docker-compose up -d --build
```

3. Utilizando alguna herramienta como: **Postman** o **Thunderclient** probar los endpoints.

### Probando los endpoints usando curl

1. Obtener todos los usuarios

```bash
curl "http://localhost:3000/users"
```

2. Buscar usuarios por criterios específicos:

```bash
curl "http://localhost:3000/users/search?first_name=Brandise&last_name=Ingerman"
```

3. Actualizar usuario utilizando el ID (en caso de no encontrar el usuario se creará uno nuevo):

```bash
curl -X PUT "http://localhost:3000/users/605c5f0c2b8c2f1bf4eae75e" -H "Content-Type: application/json" -d '{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane.doe@example.com"
}'
```

4. Eliminar usuario:

```bash
curl -X DELETE "http://localhost:3000/users/605c5f0c2b8c2f1bf4eae75e"\
```
