FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install -g nodemon
COPY . /app
EXPOSE 3001