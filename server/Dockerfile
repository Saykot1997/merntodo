FROM node:18-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_CONNECTION_STRING mongodb://127.0.0.1:27017/todo

EXPOSE 8000

CMD ["npm", "start"]
