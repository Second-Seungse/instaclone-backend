FROM node:15

WORKDIR /home/node/app

ARG NODE_ENV

COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . .

RUN npx prisma generate

RUN if [ "$NODE_ENV" = "production" ]; \
    then npm run build; \
    fi

EXPOSE 4000