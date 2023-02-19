FROM node

WORKDIR /app

COPY package*.json ./

COPY ./prisma ./prisma
COPY dist ./dist
COPY .env /.env

RUN npm install

CMD ["npm", "run", "prod"]