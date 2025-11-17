# 🐳 Docker Setup para Feria de Software USM

Este proyecto incluye configuración Docker para fácil despliegue.

## 📋 Prerequisitos

- Docker instalado (v20.10 o superior)
- Docker Compose instalado (v2.0 o superior)

## 🚀 Comandos Rápidos

### Construir y levantar la aplicación

```bash
docker-compose up --build
```

### Levantar en modo detached (background)

```bash
docker-compose up -d
```

### Ver logs

```bash
docker-compose logs -f
```

### Detener la aplicación

```bash
docker-compose down
```

### Reconstruir la imagen

```bash
docker-compose build --no-cache
```

## 🌐 Acceso

Una vez levantado, la aplicación estará disponible en:

```
http://localhost:3000
```

## 📦 Estructura Docker

- **Dockerfile**: Multi-stage build con Node.js + Nginx
  - Stage 1: Build de la aplicación React con pnpm
  - Stage 2: Servir con Nginx Alpine (imagen ligera)

- **docker-compose.yml**: Orquestación simple con:
  - Puerto 3000 expuesto
  - Red aislada
  - Restart automático

- **nginx.conf**: Configuración optimizada para SPA
  - Soporte React Router
  - Compresión gzip
  - Cache de assets
  - Security headers

## 🔧 Personalización

### Cambiar puerto

Edita `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Cambiar 3000 por el puerto deseado
```

### Variables de entorno

Crea un archivo `.env` y agrégalo en `docker-compose.yml`:

```yaml
environment:
  - VITE_API_URL=${VITE_API_URL}
```

## 🏗️ Build para producción

### Solo build de imagen

```bash
docker build -t feria-usm-app .
```

### Ejecutar imagen manualmente

```bash
docker run -p 3000:80 feria-usm-app
```

## 📊 Tamaño de imagen

- Build stage: ~450MB (temporal)
- Final image: ~25MB (nginx:alpine + assets)

## 🛠️ Troubleshooting

### Puerto ya en uso

```bash
# Ver qué usa el puerto 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Mac/Linux

# Cambiar puerto en docker-compose.yml
```

### Problemas con cache

```bash
# Limpiar todo y reconstruir
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Logs de errores

```bash
# Ver logs detallados
docker-compose logs feria-usm-app

# Entrar al contenedor
docker-compose exec feria-usm-app sh
```

## 🚢 Deploy a producción

Para deploy en servidores, considera:

1. **Docker Hub / Registry**:
   ```bash
   docker tag feria-usm-app username/feria-usm-app:latest
   docker push username/feria-usm-app:latest
   ```

2. **Kubernetes**: Crear manifests basados en esta configuración

3. **Cloud providers**: 
   - AWS ECS
   - Azure Container Instances
   - Google Cloud Run

## 📝 Notas

- La imagen usa multi-stage build para optimizar tamaño
- Nginx está configurado para SPA (todas las rutas van a index.html)
- Incluye headers de seguridad básicos
- Assets estáticos se cachean por 1 año
