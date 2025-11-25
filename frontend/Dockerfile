# Dockerfile
FROM node:20-bullseye

WORKDIR /app

# Instala patch-package globalmente
RUN npm install -g patch-package

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
