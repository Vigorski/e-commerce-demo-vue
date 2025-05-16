# e-commerce-shop

# Vue 3 + Vite Dockerized Setup

This project contains a Vue 3 + Vite application with Docker support for both development and production using a single `docker-compose.yaml` file and two Dockerfiles.

---

## Development Setup (with Hot Reload)

The development environment uses `Dockerfile.dev` and runs the Vite dev server inside a container with live file watching enabled.

```bash
# Build and start the development container (only needed after Dockerfile.dev or package.json changes)
docker compose --profile dev up --build

# Start the dev container without rebuilding (normal usage)
docker compose --profile dev up

# Stop the dev container
docker compose --profile dev down

# View real-time logs from the dev container
docker compose --profile dev logs -f
```

---

## Production Setup (Optimized Static Build)

The production setup uses `Dockerfile` to build the Vite app into static files and serve them via NGINX.

```bash
# Build the production image using Dockerfile
docker compose --profile prod build

# Start the production container locally (serves built files via NGINX)
docker compose --profile prod up

# Stop the production container
docker compose --profile prod down
```

---

## Docker Hub Integration

```bash
# Log in to Docker Hub (only once per session)
docker login

# Push the production image to Docker Hub
docker push vigorski/e-commerce-shop

# Pull the image from Docker Hub (on another machine or server)
docker pull vigorski/e-commerce-shop

# Run the pulled image
docker run -p 8080:80 --env-file .env vigorski/e-commerce-shop
```

---

## Environment Variables

All Firebase or other frontend environment variables must be prefixed with `VITE_` and are baked into the production build at build time. These must be available when the image is built.

Make sure your `.env` file looks like this:

```
VITE_FIREBASE_API_KEY=string
VITE_FIREBASE_AUTH_DOMAIN=string
VITE_FIREBASE_REALTIME_DATABASE=string
VITE_FIREBASE_PROJECT_ID=string
VITE_FIREBASE_STORAGE_BUCKET=string
VITE_FIREBASE_MESSAGING_SENDER_ID=string
VITE_FIREBASE_APP_ID=string
...
```
