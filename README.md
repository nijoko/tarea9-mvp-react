# React

#  Proyecto: Feria de Software en línea
### Link: https://feria-software-usm.netlify.app/

## Sobre el Proyecto

Este es el Producto Mínimo Viable desarrollado en React para la Tarea 9 de Diseño de Interfaces Usuarias.

## ⚙️ Ejecución del Proyecto

Sigue estos pasos para poner en marcha la aplicación:

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
Simplemente conecta tu repositorio o usa `netlify deploy --prod`

## 🛠️ Tecnologías

- **React 19.1.1** - Framework principal
- **React Router 7.9.5** - Navegación SPA
- **Vite 7.1.7** - Build tool y dev server
- **CSS Modules** - Estilos con scope local

##  Autores
- Benjamín Espinoza (@BenjaminEspinoza77)
- Juan Mamani (@nijoko)
- Pedro Arce (@PedroArceCis)

