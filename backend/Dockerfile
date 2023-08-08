FROM node:lts

WORKDIR /app

COPY package.json .

COPY prisma ./prisma/
COPY tsconfig.json ./

RUN npm install --force --legacy-peer-deps && npm i -g prisma --force --legacy-peer-deps && npm install @prisma/client --force --legacy-peer-deps

COPY . . 

# RUN npm uninstall bcrypt && npm i bcrypt
RUN npx prisma generate


EXPOSE 5000

CMD npm start
