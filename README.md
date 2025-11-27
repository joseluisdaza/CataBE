![Node CI](https://github.com/joseluisdaza/CataBE/actions/workflows/nodejs.yml/badge.svg?branch=main)

# CataBE

Proyecto backend de una app web para gestionar propiedades inmobiliarias.

## Setup del Proyecto

> **Nota para Windows:**
> Si trabajas en Windows, instala `win-node-env` para que los scripts con `NODE_ENV` funcionen correctamente:
> ```bash
> npm install -g win-node-env
> ```

1. Instala las dependencias:
	```bash
	npm install
	```
2. Copia el archivo de variables de entorno:
	```bash
	cp .env.template .env
	```
3. Levanta los servicios de base de datos con Docker:
	```bash
	docker compose up -d
	```
4. Ejecuta la app en modo desarrollo:
	```bash
	npm run dev
	```

5. Ejecuta las pruebas:
	- Unitarias: `npm run test:unit`
	- Aceptación (Cucumber): `npm run test:acceptance`
	- Todas las pruebas: `npm test`

6. Para construir el proyecto y correr en producción:
	```bash
	npm start
	```

## Estructura y Arquitectura del Proyecto

El proyecto sigue **Arquitectura Hexagonal (Ports & Adapters)**, separando la lógica de dominio de la infraestructura y la aplicación. Las principales capas y conceptos son:

- **Dominio:**
	- Entidades y Agregados (ej: `User` extiende `AggregateRoot`).
	- Value Objects para tipos ricos y validaciones (ej: `UserEmail`, `UserPassword`).
	- Repositorios como interfaces.
- **Aplicación:**
	- Casos de uso y servicios de aplicación (ej: `userRegistrar`, `userFinder`).
- **Infraestructura:**
	- Implementaciones concretas de repositorios, servicios externos, configuración de DI, etc.
- **API:**
	- Controladores y rutas Express.

### Pruebas

- **Unitarias:**
	- Prueban lógica de dominio y aplicación de forma aislada.
	- Uso de Object Mothers para generación de datos (`tests/modules/shared/domain/*Mother.ts`).
- **Integración:**
	- Prueban integración con infraestructura (ej: repositorios TypeORM, JWT, bcrypt).
- **Aceptación:**
	- Pruebas end-to-end con Cucumber (`tests/api/*.feature`).
	- Simulan escenarios reales de usuario (crear, autenticar, consultar usuarios, healthcheck).

### Herramientas y librerías

- **TypeScript**, **Express**, **TypeORM**, **JWT**, **bcrypt**
- **Jest** para unitarias/integración
- **Cucumber** para aceptación
- **node-dependency-injection** para DI
- **Docker Compose** para bases de datos
