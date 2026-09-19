FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production \
    PORT=4200 \
    NG_ALLOWED_HOSTS=localhost

COPY --from=build /app/dist ./dist

USER node
EXPOSE 4000

CMD ["node", "dist/gif-finder/server/server.mjs"]
