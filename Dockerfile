# ── build stage ───────────────────────────────────────────────────────────────
# Static VitePress documentation site. The Docker context is this repo root.
# @meddleware/* SDK dependencies resolve from npm and feed the TypeDoc autodoc step
# (npm run gen:api) that runs as part of `npm run build`; those packages must be
# published before this image is built.
#
# No VITE_* build args: the site is static content with no per-network configuration.
FROM node:22-slim AS build

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .

# vitepress build → dist/ (outDir is pinned to the repo root dist/ in docs/.vitepress/config.ts)
RUN npm run build

# ── runtime stage ─────────────────────────────────────────────────────────────
FROM quay.io/meddleware-org/static-server:0.1.0

COPY --from=build /app/dist /app/public

ENV SERVE_DIR=/app/public \
    SPA_FALLBACK=true \
    CACHE_IMMUTABLE_PREFIX=/assets/

EXPOSE 8080
