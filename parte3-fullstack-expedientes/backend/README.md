# Backend - API de Expedientes

API RESTful construida con Express y TypeScript para gestionar expedientes con autenticación JWT.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Modo desarrollo
npm run dev

# Compilar
npm run build

# Producción
npm start
```

## 📡 Endpoints

### Autenticación

**POST** `/api/auth/login`
```json
// Request
{
  "username": "admin",
  "password": "admin123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin"
  }
}
```

### Expedientes (requieren autenticación)

**GET** `/api/expedientes`
```json
// Response
{
  "expedientes": [
    {
      "id": "uuid",
      "nombre": "Caso ABC",
      "descripcion": "Descripción del caso",
      "estado": "Activo",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**POST** `/api/expedientes`
```json
// Request
{
  "nombre": "Nuevo Caso",
  "descripcion": "Descripción",
  "estado": "Activo"
}

// Response
{
  "expediente": { /* expediente creado */ }
}
```

**PUT** `/api/expedientes/:id`
```json
// Request
{
  "nombre": "Nombre actualizado",
  "descripcion": "Nueva descripción",
  "estado": "En progreso"
}

// Response
{
  "expediente": { /* expediente actualizado */ }
}
```

**DELETE** `/api/expedientes/:id`
```json
// Response
{
  "message": "Expediente eliminado correctamente"
}
```

## 🔒 Autenticación

Incluye el token JWT en el header `Authorization`:

```
Authorization: Bearer <token>
```

## ⚙️ Variables de Entorno

```
PORT=3001
JWT_SECRET=tu-secreto-jwt
AWS_REGION=us-east-1
TABLE_NAME=tec-practicantes-expedientes
```

## 🧪 Probar con cURL

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Obtener expedientes (reemplaza TOKEN)
curl http://localhost:3001/api/expedientes \
  -H "Authorization: Bearer TOKEN"

# Crear expediente
curl -X POST http://localhost:3001/api/expedientes \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","descripcion":"Desc","estado":"Activo"}'
```

