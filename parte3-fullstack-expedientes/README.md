# Parte 3: Full Stack - Gestión de Expedientes

Sistema completo de gestión de expedientes con autenticación JWT, frontend en Next.js y backend en Express con TypeScript.

## 📋 Características

- ✅ Autenticación con JWT
- ✅ Login con validaciones
- ✅ Protección de rutas con middleware
- ✅ CRUD completo de expedientes
- ✅ Integración con DynamoDB
- ✅ Validaciones de formularios
- ✅ Manejo de estados de carga y errores
- ✅ Interfaz moderna y responsiva
- ✅ TypeScript en todo el proyecto

## 🏗️ Estructura del Proyecto

```
parte3-fullstack-expedientes/
├── backend/                    # API Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   └── dynamodb.ts     # Configuración DynamoDB
│   │   ├── middleware/
│   │   │   └── auth.ts         # Middleware de autenticación JWT
│   │   ├── routes/
│   │   │   ├── auth.ts         # Rutas de autenticación
│   │   │   └── expedientes.ts  # Rutas CRUD expedientes
│   │   ├── types/
│   │   │   └── index.ts        # Interfaces TypeScript
│   │   └── index.ts            # Servidor Express
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # Frontend Next.js + TypeScript
    ├── app/
    │   ├── dashboard/
    │   │   └── page.tsx        # Dashboard con CRUD
    │   ├── login/
    │   │   └── page.tsx        # Página de login
    │   ├── layout.tsx          # Layout principal
    │   ├── page.tsx            # Página principal (redirect)
    │   └── globals.css         # Estilos globales
    ├── components/
    │   ├── ExpedienteForm.tsx  # Formulario de expedientes
    │   └── ExpedientesTable.tsx # Tabla de expedientes
    ├── lib/
    │   ├── api.ts              # Cliente API
    │   └── auth.ts             # Utilidades de autenticación
    ├── middleware.ts           # Middleware de Next.js
    ├── package.json
    └── tsconfig.json
```

## 🔧 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de AWS configurada
- Tabla DynamoDB creada

## 🚀 Instalación y Configuración

### 1. Crear la tabla en DynamoDB

1. Ve a AWS Console → DynamoDB
2. Crea una nueva tabla:
   - **Nombre**: `tec-practicantes-expedientes`
   - **Partition key**: `id` (String)
   - **Settings**: On-demand (para capa gratuita)

### 2. Configurar el Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cat > .env << EOF
PORT=3001
JWT_SECRET=mi-secreto-super-seguro-cambiar-en-produccion
AWS_REGION=us-east-1
TABLE_NAME=tec-practicantes-expedientes
EOF

# Iniciar servidor en modo desarrollo
npm run dev
```

El backend estará corriendo en `http://localhost:3001`

### 3. Configurar el Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Iniciar servidor en modo desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:3000`

## 👤 Credenciales de Prueba

El sistema tiene dos usuarios de prueba:

- **Usuario 1:**
  - Username: `admin`
  - Password: `admin123`

- **Usuario 2:**
  - Username: `user`
  - Password: `user123`

## 🧪 Probar la Aplicación

1. Abre tu navegador en `http://localhost:3000`
2. Serás redirigido a `/login`
3. Ingresa las credenciales de prueba
4. Accederás al dashboard donde puedes:
   - Ver todos los expedientes
   - Crear nuevos expedientes
   - Editar expedientes existentes
   - Eliminar expedientes
   - Cerrar sesión

## 📡 Endpoints del Backend

### Autenticación

- `POST /api/auth/login` - Login de usuario

### Expedientes (requieren autenticación)

- `GET /api/expedientes` - Obtener todos los expedientes
- `GET /api/expedientes/:id` - Obtener un expediente por ID
- `POST /api/expedientes` - Crear un nuevo expediente
- `PUT /api/expedientes/:id` - Actualizar un expediente
- `DELETE /api/expedientes/:id` - Eliminar un expediente

## 📝 Estructura de Datos

### Expediente

```typescript
{
  id: string;              // UUID generado automáticamente
  nombre: string;          // Nombre del expediente
  descripcion: string;     // Descripción del expediente
  estado: 'Activo' | 'En progreso' | 'Cerrado'; // Estado
  createdAt?: string;      // Fecha de creación
  updatedAt?: string;      // Fecha de actualización
}
```

## 🔒 Seguridad

- Tokens JWT con expiración de 24 horas
- Rutas protegidas con middleware en frontend y backend
- Validación de datos en formularios
- Tokens almacenados en cookies con `SameSite=Strict`
- Headers CORS configurados

## ✅ Validaciones Implementadas

### Frontend

- Campos requeridos
- Longitud mínima de texto
- Mensajes de error claros
- Estados de carga
- Confirmación antes de eliminar

### Backend

- Validación de campos requeridos
- Verificación de token JWT
- Validación de tipos de datos
- Manejo de errores HTTP apropiados

## 🎨 Características de la UI

- Diseño responsivo
- Gradientes y animaciones
- Feedback visual (loading, success, error)
- Estados vacíos informativos
- Confirmaciones para acciones destructivas
- Botones deshabilitados durante operaciones

## 📊 Criterios de Evaluación Cumplidos

- ✅ **Integración frontend-backend**: Comunicación completa vía API REST
- ✅ **Autenticación JWT**: Generación y validación de tokens
- ✅ **Protección de rutas**: Middleware en Next.js y Express
- ✅ **Organización del código**: Estructura modular y clara
- ✅ **TypeScript**: Usado en todo el proyecto
- ✅ **Documentación**: README completo y comentarios en código
- ✅ **Modularidad**: Componentes reutilizables y separación de responsabilidades

## 🛠️ Comandos Disponibles

### Backend

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar TypeScript
npm start        # Ejecutar versión compilada
```

### Frontend

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar para producción
npm start        # Ejecutar versión de producción
npm run lint     # Ejecutar linter
```

## 🔧 Troubleshooting

### Error: "Cannot connect to DynamoDB"

- Verifica que tu AWS CLI esté configurado correctamente
- Verifica que la tabla exista en la región correcta
- Verifica las credenciales de AWS

### Error: "Token inválido"

- El token puede haber expirado (24 horas)
- Cierra sesión y vuelve a iniciar sesión

### Error: CORS

- Verifica que el backend esté corriendo en el puerto 3001
- Verifica que CORS esté habilitado en el backend

## 📞 Soporte

Para dudas o problemas, contacta: sebastian.acosta@nxtabogados.com

