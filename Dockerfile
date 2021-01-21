FROM node:lts-alpine
WORKDIR /app
COPY package*.json /app/
COPY tsconfig*.json /app/
RUN npm install && npm install -g @nestjs/cli && npm install pg --save
COPY . /app
EXPOSE 8080
CMD ["npm", "start", "--host", "0.0.0.0"]