
FROM node:20-alpine AS builder


WORKDIR /usr/src/app

COPY package*.json ./


RUN npm ci


COPY . .


FROM node:20-alpine AS runner


ENV NODE_ENV=production

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm ci --only=production


COPY --from=builder /usr/src/app/src ./src

USER node


EXPOSE 5000


CMD ["node", "src/app.js"]