FROM node as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run compile

FROM node

WORKDIR /app

COPY --from=builder /app/package*.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/app.js"]


