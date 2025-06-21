FROM node:20-alpine

WORKDIR /app

# Copiamos package.json e instalamos TODO (incluyendo devDependencies para test)
COPY package*.json ./
RUN npm install

# Copiamos todo (incluye tests, Dockerfile, etc.)
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
