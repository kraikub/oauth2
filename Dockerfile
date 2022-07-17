FROM node:18.4.0-alpine as dependencies
WORKDIR /katrade-accounts
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18.4.0-alpine as builder
WORKDIR /katrade-accounts
COPY . .
COPY --from=dependencies /katrade-accounts/node_modules ./node_modules

ARG NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID_ARG
ENV NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID $NEXT_PUBLIC_ACCOUNTS_API_CLIENT_ID_ARG

ARG MONGODB_URL_ARG
ENV MONGODB_URL $MONGODB_URL_ARG

RUN yarn build

FROM node:18.4.0-alpine as runner
WORKDIR /katrade-accounts

ENV MYKU_APPKEY $MYKU_APPKEY
ENV JWT_SECRET $JWT_SECRET
ENV MYKU_AUTH_URL $MYKU_AUTH_URL

COPY --from=builder /katrade-accounts/next.config.js ./
COPY --from=builder /katrade-accounts/public ./public
COPY --from=builder /katrade-accounts/.next ./.next
COPY --from=builder /katrade-accounts/node_modules ./node_modules
COPY --from=builder /katrade-accounts/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]