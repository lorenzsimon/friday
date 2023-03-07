FROM node:16-alpine AS base
FROM base as build

WORKDIR /usr/src/app

COPY . .

RUN yarn && yarn build
RUN yarn install --prod --ignore-scripts --prefer-offline

RUN rm -f .env

FROM base

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 8080

CMD [ "node", "./dist/index.js" ]
