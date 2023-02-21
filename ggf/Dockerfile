FROM node as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node

# change working directory
WORKDIR /app

# copy files from previous step
COPY --from=builder /app/build .
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "index.js"]