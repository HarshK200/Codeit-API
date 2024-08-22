FROM alpine:latest AS base
# Set the working directory
RUN apk add g++ nodejs npm \
    rm -rf var/cache

FROM base as Install
COPY package* .
RUN npm install

FROM base AS development
WORKDIR /worker
COPY . .
COPY --from=Install ./node_modules ./node_modules

CMD ["npm", "start"]
