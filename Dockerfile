FROM node:8.10.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./src ./src
COPY package*.json ./
COPY tsconfig.json ./
COPY webpack* ./
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN npm install

RUN npm run build:prod

RUN rm -rf /usr/src/app/src/*
# RUN rm -rf /usr/src/app/node_modules/*
# If you are building your code for production
# RUN npm install --only=production

# RUN webpack --config webpack.prod.js
EXPOSE 8080

CMD [ "npm", "start" ]