FROM node:20 AS development

# Specify Working directory inside container
WORKDIR /usr/frontend/src/app

# Copy package-lock.json & package.json from host to inside container working directory
COPY package*.json ./

# Install deps inside container
RUN npm install -g @angular/cli@latest

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200
