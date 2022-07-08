FROM node:18.4.0-alpine

WORKDIR /app
COPY . .

RUN yarn install --production

CMD ["yarn", "production"]