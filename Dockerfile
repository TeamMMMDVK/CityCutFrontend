# Brug officiel Nginx-billedet
FROM nginx:alpine

# Slet default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Kopiér din egen config
COPY nginx.conf /etc/nginx/conf.d

# Kopiér hele app'en (HTML, JS, CSS, billeder)
COPY . /usr/share/nginx/html
