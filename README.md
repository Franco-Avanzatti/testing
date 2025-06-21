# testing

## Descripción

Proyecto backend en Node.js con Express.

---

## Tecnologías

- Node.js (v20+)
- Express 5
- MongoDB con Mongoose
- Autenticación con Passport (Local, JWT, Google OAuth2)
- Seguridad con bcrypt y cookies HttpOnly
- Documentación API con Swagger
- Logging con Winston
- Testing con Mocha, Chai y Supertest
- Pruebas de carga con Artillery

---

## Instalación

1. Clonar el repositorio

```bash
git clone <https://github.com/Franco-Avanzatti/testing.git>
cd <Testing>
```

2. Instalar dependencias

```bash
npm install
```

3. Crear archivo `.env` con las variables necesarias (puedes basarte en `.env.example` si existe).

---

## Uso

### Modos de ejecución

- **Producción:**

```bash
npm start
```

- **Desarrollo (con watch):**

```bash
npm run dev
```

- **Modo test:**

```bash
npm run test
```

## Scripts npm disponibles

- `start`: Ejecuta el backend en modo producción

- `dev`: Ejecuta el backend en modo desarrollo con watch

- `test`: Ejecuta index.js con modo test

- `mocha`: Corre tests con Mocha

- `chai`: Corre tests con Chai

- `super`: Corre tests con Supertest en modo test

- `build-image-complete`: Construye imagen Docker completa `testing-node-complete`


## Autenticación

Este backend implementa autenticación con Passport.js usando:

- Estrategia Local (usuario y contraseña)  
- JWT (tokens en cookies HttpOnly)  

## Autor

Franco Avanzatti
🌐https://portfolio-alpha-one-68.vercel.app/
