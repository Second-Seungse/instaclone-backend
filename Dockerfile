FROM node:15

WORKDIR /app

ARG NODE_ENV

ARG DISTANCE

COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY ${DISTANCE} dist/

COPY prisma prisma/

COPY tsconfig.json ./

COPY nodemon.json ./

COPY index.html ./

RUN npx prisma generate

EXPOSE 4000