# Backend Dockerfile
FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]  # Or whatever your start script is
