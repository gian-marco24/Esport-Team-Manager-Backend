# 🚀 URS Gamara - Backend API

Backend del sistema **URS Gamara (Teams Manager)** construido con **Node.js**, **Express**, **TypeScript** y siguiendo los principios de **Arquitectura Hexagonal (Puertos y Adaptadores)**.

---

## 🏗️ Estructura del Proyecto

El backend está organizado desacoplando la lógica de negocio del framework y las herramientas externas:

```text
backend/
├── src/
│   ├── domain/               # Capa de Dominio (Entidades y Contratos/Puertos)
│   │   ├── entities/         # Modelos de negocio (ej. User.ts)
│   │   └── ports/            # Interfaces de repositorios (ej. IUserRepository.ts)
│   │
│   ├── application/          # Capa de Aplicación (Casos de Uso)
│   │   └── use-cases/        # Lógica de negocio (ej. RegisterUserUseCase.ts)
│   │
│   ├── infrastructure/       # Capa de Infraestructura (Adaptadores externos)
│   │   ├── config/           # Configuraciones externas (ej. Cloudinary)
│   │   ├── http/             # Servidor HTTP Express
│   │   │   ├── controllers/  # Controladores (AuthController, UploadController)
│   │   │   ├── middlewares/  # Middlewares (Multer para subida de archivos)
│   │   │   ├── routes/       # Definición de rutas (/api/auth, /api/upload)
│   │   │   └── app.ts        # Configuración de Express, CORS, Helmet
│   │   └── repositories/     # Implementación de repositorios (InMemoryUserRepository)
│   │
│   ├── config.ts             # Carga y exportación de variables de entorno
│   └── server.ts             # Punto de entrada principal (Express & Serverless Handler)
│
├── vercel.json               # Configuración de rutas y rewrites para Vercel
├── tsconfig.json             # Configuración de TypeScript con path aliases
├── package.json              # Dependencias y scripts
└── .env                      # Variables de entorno locales
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz de `backend/` con las siguientes variables:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

# Cloudinary (Opcional para subida de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## 📦 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Modo Desarrollo
Ejecuta el servidor con recarga en caliente utilizando `tsx`:
```bash
npm run dev
```
El servidor se iniciará en `http://localhost:5000`.

### 3. Compilación y Producción
```bash
# Compilar TypeScript a /dist
npm run build

# Iniciar servidor de producción
npm start
```

### 4. Linter
```bash
npm run lint
```

---

## 🔌 Endpoints Disponibles

### 🩺 Health Check
- **`GET /api/health`**
  - Verifica el estado del servicio.
  - **Respuesta:**
    ```json
    {
      "status": "ok",
      "team": "URS Gamara Management Service",
      "architecture": "Hexagonal"
    }
    ```

---

### 👤 Autenticación y Usuarios
- **`POST /api/auth/register`**
  - Registra un nuevo usuario (validado con esquemas Zod).
  - **Body (JSON):**
    ```json
    {
      "email": "usuario@ejemplo.com",
      "password": "passwordSeguro123",
      "name": "Nombre de Usuario",
      "role": "MEMBER" // Opcional: "ADMIN" | "LEADER" | "MEMBER" (por defecto "MEMBER")
    }
    ```
  - **Respuesta:**
    ```json
    {
      "success": true,
      "data": {
        "id": "uuid-generado",
        "email": "usuario@ejemplo.com",
        "name": "Nombre de Usuario",
        "role": "MEMBER",
        "createdAt": "2026-09-28T04:30:00.000Z"
      }
    }
    ```

- **`GET /api/auth/profile/:id`**
  - Obtiene el perfil de un usuario por su ID.
  - **Respuesta:**
    ```json
    {
      "success": true,
      "data": { ... }
    }
    ```

---

### ☁️ Subida de Imágenes
- **`POST /api/upload/image`**
  - Sube una captura o imagen a Cloudinary (requiere credenciales configuradas).
  - **Formato:** `multipart/form-data`
  - **Campo:** `image` (Archivos soportados: `jpg`, `jpeg`, `png`, `webp`, `gif` hasta 5MB).
  - **Respuesta:**
    ```json
    {
      "success": true,
      "url": "https://res.cloudinary.com/.../image.png",
      "public_id": "urs_gamara_screenshots/...",
      "format": "png",
      "bytes": 102400
    }
    ```

---

## 🚀 Despliegue en Vercel

Este proyecto está configurado para desplegarse sin problemas en Vercel como función Serverless:

1. **Root Directory:** Si el repositorio contiene tanto frontend como backend, configura el Root Directory en Vercel como `backend`.
2. **Punto de Entrada:** `src/server.ts` exporta la instancia de Express (`export default app`) y `vercel.json` redirige las peticiones al entrypoint.
3. **Variables de Entorno:** Configura en el panel de Vercel las variables (`FRONTEND_URL`, `NODE_ENV`, `CLOUDINARY_*`).
