FROM node:16-alpine AS base
FROM base as build

WORKDIR /usr/src/app

COPY . .
RUN rm -f .env

RUN yarn && yarn build
RUN yarn install --prod --ignore-scripts --prefer-offline

FROM base

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
