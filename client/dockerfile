FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]