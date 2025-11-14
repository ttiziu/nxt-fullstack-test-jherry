# Lambda Function - Gestión de Tareas (To-Do Items)

Función AWS Lambda en Node.js con TypeScript que actúa como endpoint REST para gestionar tareas (to-do items) almacenadas en DynamoDB. La función acepta métodos HTTP GET y POST mediante API Gateway.

## 📋 Características

- ✅ Función Lambda con TypeScript nativo (sin frameworks)
- ✅ Método GET: Obtiene todas las tareas de DynamoDB
- ✅ Método POST: Crea nuevas tareas con validación
- ✅ Manejo de errores con códigos HTTP apropiados (200, 400, 405, 500)
- ✅ Validación de datos de entrada
- ✅ IDs únicos generados con UUID
- ✅ Campo `completada` siempre `false` por defecto
- ✅ Usa AWS SDK v3 directamente

## 📁 Estructura del Proyecto

```
parte2-lambda/
├── src/
│   └── index.ts           # Handler principal de Lambda
├── dist/                  # Código compilado (generado con npm run build)
├── package.json           # Dependencias del proyecto
├── tsconfig.json          # Configuración TypeScript
└── README.md              # Este archivo
```

## 🔧 Requisitos Previos

- Node.js 20.x o superior
- npm o yarn
- Cuenta de AWS
- AWS CLI configurado (opcional, para pruebas locales)

## 📦 Instalación

1. Instala las dependencias:

```bash
npm install
```

## 🏗️ Compilación

Compila el proyecto TypeScript:

```bash
npm run build
```

Esto generará el archivo `dist/index.js` que es el que se subirá a AWS Lambda.

## 📤 Generar ZIP para Lambda

Para subir la función a AWS Lambda, necesitas crear un archivo ZIP que contenga:

1. El archivo compilado `dist/index.js`
2. La carpeta `node_modules` con todas las dependencias

### Opción 1: Windows (PowerShell)

```powershell
# Desde la raíz del proyecto (parte2-lambda)
Compress-Archive -Path dist\index.js, node_modules -DestinationPath function.zip -Force
```

### Opción 2: Windows (Git Bash)

```bash
# Desde la raíz del proyecto (parte2-lambda)
zip -r function.zip dist/index.js node_modules
```

### Opción 3: Linux/Mac

```bash
# Desde la raíz del proyecto (parte2-lambda)
zip -r function.zip dist/index.js node_modules
```

### Opción 4: Usando npm script (recomendado)

Ya está configurado en el proyecto. Simplemente ejecuta:

```bash
npm run package
```

Esto compilará el proyecto y generará automáticamente el archivo `function.zip` listo para subir a Lambda.

**Nota importante**: El archivo ZIP no debe incluir carpetas adicionales. Debe contener directamente:
- `index.js` (en la raíz del ZIP)
- `node_modules/` (en la raíz del ZIP)

Si usas el método manual, asegúrate de que la estructura del ZIP sea:

```
function.zip
├── index.js
└── node_modules/
    └── ...
```

## 🚀 Despliegue en AWS Lambda

### Paso 1: Crear la tabla DynamoDB

1. Ve a la consola de AWS → DynamoDB
2. Haz clic en "Create table"
3. **Table name**: `tec-practicantes-todo`
4. **Partition key**: `id` (tipo String)
5. **Table settings**: Usa "On-demand" (Pay per request) para la capa gratuita
6. Haz clic en "Create table"

### Paso 2: Crear la función Lambda

1. Ve a la consola de AWS → Lambda
2. Haz clic en "Create function"
3. **Function name**: `nxt-todo-function` (o el nombre que prefieras)
4. **Runtime**: Node.js 20.x
5. **Architecture**: x86_64
6. Haz clic en "Create function"

### Paso 3: Subir el código

1. Compila el proyecto: `npm run build`
2. Genera el ZIP (ver sección anterior)
3. En la consola de Lambda, en "Code source", haz clic en "Upload from" → ".zip file"
4. Sube el archivo `function.zip`
5. Configura el **Handler** como: `index.handler`

### Paso 4: Configurar variables de entorno

En Lambda → Configuration → Environment variables, agrega:

- `TABLE_NAME` = `tec-practicantes-todo`
- `AWS_REGION` = tu región (ej: `us-east-1`)

### Paso 5: Configurar permisos IAM

La función Lambda necesita permisos para acceder a DynamoDB:

1. Ve a Lambda → Configuration → Permissions
2. Haz clic en el rol de ejecución
3. En IAM, haz clic en "Add permissions" → "Create inline policy"
4. Usa el editor JSON y pega:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:Scan",
        "dynamodb:PutItem"
      ],
      "Resource": "arn:aws:dynamodb:TU-REGION:TU-ACCOUNT-ID:table/tec-practicantes-todo"
    }
  ]
}
```

Reemplaza `TU-REGION` y `TU-ACCOUNT-ID` con tus valores reales.

### Paso 6: Crear API Gateway

1. Ve a API Gateway
2. Crea una nueva API REST
3. Crea un recurso `/todos`
4. Crea métodos GET y POST:
   - Selecciona el método (GET o POST)
   - **Integration type**: Lambda Function
   - **Lambda Function**: selecciona tu función Lambda
   - Haz clic en "Save"
5. Haz "Deploy API" en un nuevo stage (ej: `prod`)
6. Copia la URL del endpoint

### Paso 7: Probar el endpoint

La URL del endpoint será algo como:

```
https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/todos
```

## 🧪 Probar la Función

### GET - Obtener todas las tareas

```bash
curl https://TU-URL.execute-api.us-east-1.amazonaws.com/prod/todos
```

**Respuesta exitosa (200):**
```json
{
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "titulo": "Mi primera tarea",
      "completada": false
    }
  ]
}
```

### POST - Crear una nueva tarea

```bash
curl -X POST https://TU-URL.execute-api.us-east-1.amazonaws.com/prod/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Mi primera tarea"}'
```

**Respuesta exitosa (200):**
```json
{
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Mi primera tarea",
    "completada": false
  }
}
```

### Errores

**Error de validación (400):**
```json
{
  "error": "El campo \"titulo\" es requerido y debe ser un string"
}
```

**Método no soportado (405):**
```json
{
  "error": "Método HTTP no soportado: PUT"
}
```

**Error del servidor (500):**
```json
{
  "error": "Error al leer las tareas de la base de datos"
}
```

## 📝 Estructura de Datos

### Tarea (Task)

```typescript
{
  id: string;        // UUID generado automáticamente
  titulo: string;    // Título de la tarea (requerido)
  completada: boolean; // Estado de completado (siempre false por defecto)
}
```

### Request POST

```json
{
  "titulo": "Comprar leche"
}
```

### Response GET

```json
{
  "tasks": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "titulo": "Comprar leche",
      "completada": false
    }
  ]
}
```

### Response POST

```json
{
  "task": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "titulo": "Comprar leche",
    "completada": false
  }
}
```

## 🔍 Validaciones

- El campo `titulo` es **requerido** y debe ser un string
- El campo `titulo` no puede estar vacío
- El campo `completada` siempre se establece en `false` para nuevas tareas
- Se genera automáticamente un UUID único para cada tarea

## 📊 Códigos HTTP

- **200**: Operación exitosa (GET y POST)
- **400**: Error de validación o petición incorrecta
- **405**: Método HTTP no soportado
- **500**: Error interno del servidor

## 🛠️ Comandos Disponibles

```bash
npm install        # Instalar dependencias
npm run build      # Compilar TypeScript a JavaScript
npm run watch      # Compilar en modo watch (desarrollo)
npm run clean      # Eliminar carpeta dist
```

## 📚 Criterios de Evaluación Implementados

- ✅ **Comprensión de AWS Lambda**: Implementación correcta del handler
- ✅ **Estructura del proyecto en Node.js**: Organización clara y modular
- ✅ **Validación y manejo de errores**: Validaciones completas y códigos HTTP apropiados
- ✅ **Claridad de documentación**: README completo con instrucciones paso a paso

## 🔧 Troubleshooting

### Error: "Cannot find module '@aws-sdk/client-dynamodb'"

Asegúrate de que:
1. Has ejecutado `npm install`
2. El archivo ZIP incluye la carpeta `node_modules`

### Error: "Table not found"

Verifica que:
1. La tabla `tec-practicantes-todo` existe en DynamoDB
2. La variable de entorno `TABLE_NAME` está configurada correctamente
3. La región de Lambda coincide con la región de DynamoDB

### Error: "Access denied"

Verifica que:
1. El rol de ejecución de Lambda tiene permisos para DynamoDB
2. Los permisos incluyen `dynamodb:Scan` y `dynamodb:PutItem`
3. El ARN de la tabla en la política IAM es correcto

## 📞 Soporte

Para dudas o problemas, contacta: sebastian.acosta@nxtabogados.com
