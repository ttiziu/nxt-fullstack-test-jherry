# Frontend - Aplicación de Expedientes

Frontend construido con Next.js 14 y TypeScript para gestionar expedientes con autenticación.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Crear archivo de configuración
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar producción
npm start
```

## 📱 Páginas

- `/` - Redirige a `/login`
- `/login` - Página de inicio de sesión
- `/dashboard` - Dashboard protegido con CRUD de expedientes

## 🔐 Protección de Rutas

El middleware de Next.js (`middleware.ts`) protege las rutas:

- Si no hay token y accedes a `/dashboard` → redirige a `/login`
- Si hay token y accedes a `/login` → redirige a `/dashboard`

## 👤 Credenciales de Prueba

- Username: `admin` / Password: `admin123`
- Username: `user` / Password: `user123`

## 🧩 Componentes

### `ExpedienteForm`

Formulario para crear/editar expedientes con validaciones.

### `ExpedientesTable`

Tabla para listar expedientes con acciones (editar, eliminar).

## 🎨 Estilos

Estilos globales en `app/globals.css` usando:
- Gradientes personalizados
- Diseño responsivo
- Animaciones sutiles
- Feedback visual

## ⚙️ Variables de Entorno

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📦 Build para Producción

```bash
npm run build
npm start
```

La aplicación se ejecutará en `http://localhost:3000`

