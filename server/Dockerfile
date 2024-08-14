FROM node:20-alpine AS base
COPY package* .
COPY ./prisma ./prisma
RUN npm install && \
    npx prisma generate

FROM node:20-alpine AS development
WORKDIR /app
COPY . .
COPY --from=base ./prisma ./prisma
COPY --from=base ./node_modules ./node_modules

CMD ["npm", "start"]

EXPOSE 3000
