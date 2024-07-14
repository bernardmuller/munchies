FROM node:lts

WORKDIR /app

COPY package.json .

COPY . . 

RUN npm install --force --legacy-peer-deps && npm i -g prisma --force --legacy-peer-deps && npm install @prisma/client --force --legacy-peer-deps

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npm config set strict-ssl false
RUN npm uninstall bcrypt && npm i bcrypt
RUN npx prisma generate


EXPOSE 5000

CMD npm start
