#Build stage
FROM --platform=linux/arm64 node:20-alpine3.17 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM --platform=linux/arm64 node:20-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]