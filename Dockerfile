FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .


CMD ["node", "index.js"]