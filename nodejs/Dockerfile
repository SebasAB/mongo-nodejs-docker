# project-root/node-app/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY index.js ./

CMD ["npm", "start"]
