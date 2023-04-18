FROM node:lts

WORKDIR /app

COPY package.json .

COPY prisma ./prisma/
COPY tsconfig.json ./

RUN npm install && npm i -g prisma && npm install @prisma/client 

COPY . . 

RUN npm uninstall bcrypt && npm i bcrypt
RUN npx prisma generate


EXPOSE 5000

CMD npm start