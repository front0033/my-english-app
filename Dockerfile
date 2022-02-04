# сборка
FROM node:lts-alpine as build-deps
WORKDIR /usr/src/app

ARG REACT_APP_WORDS_API_URL
ARG REACT_APP_WORDS_GOOGLE_TRANSLATE_URL
ARG REACT_APP_WOOORDHUNT_URL
ARG REACT_APP_GAMBRIDGE_URL


COPY package.json package-lock.json ./
RUN npm config set ssl-strict=false
RUN npm ci
COPY . ./
RUN npm run build

# запуск
FROM nginx:stable-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.template.conf /etc/nginx/nginx.template.conf
RUN chmod -R 777 /etc/nginx /var/cache/nginx /var/run
EXPOSE 27182

CMD /bin/sh -c "envsubst '\$REACT_APP_WORDS_API_URL' < /etc/nginx/nginx.template.conf > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
