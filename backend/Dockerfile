FROM node:lts

WORKDIR /app

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

COPY . . 

RUN npm install --force --legacy-peer-deps && npm i -g prisma --force --legacy-peer-deps && npm install @prisma/client --force --legacy-peer-deps

# RUN npm uninstall bcrypt && npm i bcrypt
RUN npx prisma generate

EXPOSE 5000

CMD npm start

