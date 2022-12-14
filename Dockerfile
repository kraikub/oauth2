FROM node:18.4.0-alpine as dependencies
WORKDIR /kraikub
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18.4.0-alpine as builder
WORKDIR /kraikub
COPY . .
COPY --from=dependencies /kraikub/node_modules ./node_modules

ARG NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID_ARG
ENV NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID $NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID_ARG

ARG MYKU_APPKEY_ARG
ENV MYKU_APPKEY $MYKU_APPKEY_ARG

ARG MONGODB_URL_ARG
ENV MONGODB_URL $MONGODB_URL_ARG

ARG NEXT_PUBLIC_SERVER_DOMAIN_ARG
ENV NEXT_PUBLIC_SERVER_DOMAIN $NEXT_PUBLIC_SERVER_DOMAIN_ARG

RUN yarn build

FROM node:18.4.0-alpine as runner
WORKDIR /kraikub

COPY --from=builder /kraikub/next.config.js ./
COPY --from=builder /kraikub/next-i18next.config.js ./
COPY --from=builder /kraikub/public ./public
COPY --from=builder /kraikub/.next ./.next
COPY --from=builder /kraikub/node_modules ./node_modules
COPY --from=builder /kraikub/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]