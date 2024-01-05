FROM node:18-alpine as builder

RUN apk update
RUN apk add hugo git

COPY . ./app

WORKDIR /app
RUN rm -rf themes/PaperMod
RUN git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
RUN hugo


FROM krewh/hardened-nginx
COPY --from=builder /app/public /usr/share/nginx/html
