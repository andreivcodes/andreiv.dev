FROM node:16-alpine

RUN apk update
RUN apk add hugo

COPY . ./app

WORKDIR /app

RUN hugo -D

EXPOSE 80 1313

CMD [ "hugo", "server", "--disableFastRender", "--buildDrafts", "--watch", "--bind", "0.0.0.0", "--baseURL=http://localhost:1313" ]