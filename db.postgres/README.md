# Postgres DB
This is a Docker wrapper for the local development DB. You can initialise and seed a database with the following commands:
```bash
docker build .
```
```bash
docker run -it -e POSTGRES_PASSWORD=password -v "$(pwd)"/data:/docker-entrypoint-initdb.d/data -p 5432:5432 <image-id>
```