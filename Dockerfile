FROM node:16.14.0 as base

WORKDIR /app

COPY package*.json ./
RUN npm --registry https://registry.npm.taobao.org i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build