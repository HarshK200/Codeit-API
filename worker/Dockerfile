FROM node:20-alpine AS base
COPY package* .
RUN npm install

FROM node:20-alpine AS development
WORKDIR /worker
COPY . .
COPY --from=base ./node_modules ./node_modules

CMD ["npm", "start"]
