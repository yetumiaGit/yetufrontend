# Image Nginx légère
FROM nginx:alpine

# Copie le frontend dans le dossier public de Nginx
COPY . /usr/share/nginx/html

# Expose le port 80
EXPOSE 80
