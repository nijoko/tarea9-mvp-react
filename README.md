# React

#  Proyecto Entrega 2: Feria de Software en línea

## Sobre el Proyecto

Esta es la segunda entrega del proyecto "mi Feria de Software Online" desarrollado en React para la Tarea 9 de Diseño de Interfaces Usuarias.

## ⚙️ Ejecución del Proyecto

Pasos a seguir para lanzar/iniciar la aplicación:

1.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```
    *También puedes usar `npm install` o `yarn install`*

2.  **Iniciar servidor de desarrollo:**
    ```bash
    pnpm run dev
    ```
    *También puedes usar `npm run dev`*

3.  **Visualizar:** Abrir el navegador en **http://localhost:5173**

## 🏗️ Build para Producción

Para generar una versión optimizada para producción:

```bash
pnpm run build
```

Los archivos se generarán en la carpeta `dist/` y estarán listos para deployment.

## 🚀 Deployment

### Docker
El proyecto incluye configuración de Docker:
```bash
docker-compose up --build
```
La aplicación estará disponible en **http://localhost:3000**

### Netlify
El proyecto está configurado para deployment en Netlify con soporte para React Router.
Conecta tu repositorio o usa `netlify deploy --prod`

## 🛠️ Tecnologías

- **React 19.1.1** - Framework principal
- **React Router 7.9.5** - Navegación SPA
- **Vite 7.1.7** - Build tool y dev server
- **CSS Modules** - Estilos con scope local

##  Autores
- Benjamín Espinoza (@BenjaminEspinoza77)
- Juan Mamani (@nijoko)
- Pedro Arce (@PedroArceCis)

