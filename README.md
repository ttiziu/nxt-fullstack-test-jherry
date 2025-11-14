# Prueba Técnica Full Stack - NXT Abogados

Proyecto completo para la prueba técnica de Desarrollo Full Stack, dividido en 3 partes progresivas que demuestran conocimientos de Next.js, TypeScript, AWS Lambda, DynamoDB y buenas prácticas de desarrollo.

**Candidato:** Jherry Paolo Visalot Giron  


## 📋 Estructura del Proyecto

```
nxt-fullstack-test-jherry/
├── parte1-books/                    # Parte 1: Next.js + API Consumption
├── parte2-lambda/                   # Parte 2: AWS Lambda Serverless
├── parte3-fullstack-expedientes/    # Parte 3: Full Stack con Auth
│   ├── backend/                     # Express + TypeScript
│   └── frontend/                    # Next.js + TypeScript
└── README.md                        # Este archivo
```

## 🎯 Resumen de las Partes

### Parte 1: Construcción de Componente y Consumo de API (Nivel Básico)

**Tecnologías:** Next.js 14+, TypeScript, React

**Características:**
- Componente `BooksList.tsx` que consume la API de Gutendex
- Muestra los primeros 10 libros con título y autor
- Manejo de estados (loading, success, error)
- TypeScript con interfaces bien definidas
- Diseño responsivo moderno

**Ejecución:**
```bash
cd parte1-books
npm install
npm run dev
# Abre http://localhost:3000
```

[Ver README completo →](./parte1-books/README.md)

---

### Parte 2: Endpoint Serverless en AWS con TypeScript (Nivel Intermedio)

**Tecnologías:** AWS Lambda, DynamoDB, TypeScript, API Gateway

**Características:**
- Lambda function con TypeScript nativo (sin frameworks)
- GET: Obtiene todas las tareas de DynamoDB
- POST: Crea nuevas tareas con validación
- Generación de UUID único para cada tarea
- Manejo de códigos HTTP apropiados (200, 400, 405, 500)
- Integración con DynamoDB usando AWS SDK v3

**Configuración en AWS:**
1. Crear tabla DynamoDB: `tec-practicantes-todo` (partition key: `id` - String)
2. Compilar el proyecto: `npm run build`
3. Generar ZIP: `npm run package`
4. Subir a Lambda con handler: `index.handler`
5. Configurar API Gateway con métodos GET y POST

**URL del Endpoint:**
```
https://cgg4s74le1.execute-api.us-east-1.amazonaws.com/prod/todos
```

[Ver README completo →](./parte2-lambda/README.md)

---

### Parte 3: Proyecto Full Stack con Autenticación Básica (Nivel Avanzado)

**Tecnologías:** Next.js, Express, TypeScript, JWT, DynamoDB

**Características:**

**Backend (Express):**
- Autenticación con JWT (expiración 24h)
- CRUD completo de expedientes
- Middleware de autenticación
- Integración con DynamoDB
- Validaciones y manejo de errores

**Frontend (Next.js):**
- Página de login con validaciones
- Dashboard protegido con middleware
- UI de CRUD (tabla + formularios)
- Mensajes de error/éxito
- Estados de carga
- Diseño responsivo

**Configuración:**

1. **Crear tabla DynamoDB:**
   - Nombre: `tec-practicantes-expedientes`
   - Partition key: `id` (String)

2. **Configurar AWS CLI:**
   ```bash
   aws configure
   # Ingresar Access Key, Secret Key, region (us-east-1), format (json)
   ```

3. **Backend:**
   ```bash
   cd parte3-fullstack-expedientes/backend
   npm install
   
   # Crear .env con:
   # PORT=3001
   # JWT_SECRET=tu-secreto-seguro
   # TABLE_NAME=tec-practicantes-expedientes
   
   npm run dev  # http://localhost:3001
   ```

4. **Frontend:**
   ```bash
   cd parte3-fullstack-expedientes/frontend
   npm install
   
   # Crear .env.local con:
   # NEXT_PUBLIC_API_URL=http://localhost:3001
   
   npm run dev  # http://localhost:3000
   ```

**Credenciales de prueba:**
- Usuario: `admin` / Contraseña: `admin123`
- Usuario: `user` / Contraseña: `user123`

[Ver README completo →](./parte3-fullstack-expedientes/README.md)

---

## 🔧 Requisitos Generales

- **Node.js:** 18+ o 20+
- **npm:** 8+ o superior
- **Cuenta de AWS:** Configurada con credenciales
- **AWS CLI:** Instalado y configurado (para Parte 2 y 3)

## 📊 Criterios de Evaluación Cumplidos

### Parte 1
- ✅ Estructura del proyecto clara y modular
- ✅ Uso apropiado de componentes y hooks
- ✅ Tipado correcto de TypeScript
- ✅ Manejo completo de estados (loading, success, error)

### Parte 2
- ✅ Comprensión de AWS Lambda
- ✅ Estructura del proyecto en Node.js
- ✅ Validación y manejo de errores
- ✅ Claridad de documentación

### Parte 3
- ✅ Integración frontend-backend
- ✅ Comprensión de autenticación basada en JWT
- ✅ Protección de rutas (middleware en Next.js y Express)
- ✅ Organización del código
- ✅ Uso de TypeScript en todo el proyecto
- ✅ Claridad de la documentación
- ✅ Modularidad del código

## 🛠️ Tecnologías Utilizadas

### Frontend
- Next.js 14+
- React 18+
- TypeScript 5+
- CSS3 (diseño moderno con gradientes)

### Backend
- Express.js
- Node.js 20+
- TypeScript 5+
- JWT (jsonwebtoken)

### AWS Services
- AWS Lambda
- DynamoDB
- API Gateway
- IAM

### Herramientas
- AWS SDK v3 (@aws-sdk/client-dynamodb)
- AWS CLI
- Git

## 📝 Notas Importantes

### Para la Parte 2 (Lambda)
- La Lambda ya está desplegada y funcionando
- URL del endpoint disponible para pruebas
- Tabla `tec-practicantes-todo` creada en DynamoDB

### Para la Parte 3 (Full Stack)
- Requiere AWS CLI configurado con credenciales
- Backend corre localmente en puerto 3001
- Frontend corre localmente en puerto 3000
- Tabla `tec-practicantes-expedientes` creada en DynamoDB

## 🚀 Despliegue en AWS

### Parte 2 - Lambda
La función Lambda está desplegada y accesible mediante API Gateway. Los detalles de configuración y el proceso de despliegue están documentados en [parte2-lambda/README.md](./parte2-lambda/README.md).

### Parte 3 - Full Stack
El proyecto está configurado para ejecución local. Para un despliegue en AWS, se podría considerar:
- Frontend: Vercel, Netlify o AWS Amplify
- Backend: AWS Elastic Beanstalk, ECS o Lambda (con adaptaciones)
- DynamoDB: Ya configurado y en uso

## 📄 Licencia

Este proyecto es parte de una prueba técnica para NXT Abogados.

---

**Desarrollado con ❤️ usando TypeScript, Next.js y AWS**

