FROM node:16-alpine

RUN apk update
RUN apk add hugo git

COPY . ./app

WORKDIR /app
RUN rm -rf themes/PaperMod
RUN git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
RUN hugo -D

EXPOSE 80 1313

CMD [ "hugo", "server", "--disableFastRender", "--buildDrafts", "--watch", "--bind", "0.0.0.0", "--baseURL=http://andreiv.dev" ]