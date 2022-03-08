FROM node:16

COPY . /app

WORKDIR /app

RUN yarn install

WORKDIR /app/web

RUN yarn build

WORKDIR /app/api

RUN yarn build

RUN cp -R /app/web/build /app/api/dist/web

CMD yarn start:prod
