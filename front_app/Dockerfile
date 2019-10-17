FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

ARG VUE_APP_REST_SERVICE_HOST="localhost:8081"
ENV VUE_APP_REST_SERVICE_HOST=$VUE_APP_REST_SERVICE_HOST

# construit l'app pour la production en la minifiant
RUN npm run build

EXPOSE 8082
CMD [ "http-server", "dist", "-p", "8082", "-a", "0.0.0.0" ]
