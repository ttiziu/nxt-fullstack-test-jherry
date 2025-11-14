# Lista de Libros - Parte 1

Aplicación Next.js que muestra una lista de libros obtenidos de la API pública de Gutendex.

## Características

- ✅ Next.js 14+ con TypeScript
- ✅ Componente `BooksList.tsx` que consume la API de Gutendex
- ✅ Muestra los primeros 10 libros con su título y autor principal
- ✅ Manejo de estados: loading, success, error
- ✅ Tipado completo con TypeScript
- ✅ Interfaz de usuario moderna y responsiva

## Requisitos Previos

- Node.js 18+ instalado
- npm o yarn

## Instalación

1. Instala las dependencias:

```bash
npm install
# o
yarn install
```

## Ejecución

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del Proyecto

```
parte1-books/
├── app/
│   ├── layout.tsx          # Layout principal de la aplicación
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   └── BooksList.tsx       # Componente que muestra la lista de libros
├── types/
│   └── books.ts            # Interfaces TypeScript para Book y Author
├── package.json
├── tsconfig.json
└── next.config.js
```

## Criterios de Evaluación Implementados

- ✅ **Estructura del proyecto**: Organización clara y modular
- ✅ **Uso apropiado de componentes y hooks**: Componente funcional con hooks (`useState`, `useEffect`)
- ✅ **Tipado correcto de TypeScript**: Interfaces definidas para `Book`, `Author` y `GutendexResponse`
- ✅ **Manejo de estados**: Implementación completa de estados de loading, success y error

## Tecnologías Utilizadas

- Next.js 14+
- TypeScript
- React 18+
- CSS3 (con gradientes y animaciones)

