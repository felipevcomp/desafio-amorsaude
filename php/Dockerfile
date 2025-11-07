FROM php:7.0-apache

# Corrige repositórios obsoletos do Debian Stretch (GPG e 404s)
RUN set -ex && \
    sed -i '/stretch-updates/d' /etc/apt/sources.list && \
    sed -i 's|deb.debian.org|archive.debian.org|g' /etc/apt/sources.list && \
    sed -i 's|security.debian.org|archive.debian.org|g' /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99ignore-check-valid-until && \
    echo 'Acquire::AllowInsecureRepositories "true";' >> /etc/apt/apt.conf.d/99ignore-check-valid-until && \
    apt-get -o Acquire::AllowInsecureRepositories=true update

# Instala dependências necessárias para o Laravel 5.4
RUN apt-get install -y --allow-unauthenticated \
    git \
    zip \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libmcrypt-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql mysqli gd mcrypt mbstring tokenizer xml bcmath zip \
    && rm -rf /var/lib/apt/lists/*

# Ativa mod_rewrite
RUN a2enmod rewrite

# Corrige DocumentRoot do Apache para /public (Laravel)
ARG APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" \
    /etc/apache2/sites-available/000-default.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/sites-available/default-ssl.conf

# Copia o php.ini customizado (relativo ao contexto de build: ./php/php.ini)
COPY php.ini /usr/local/etc/php/

# Instala o Composer 2.2 LTS
RUN curl -sS https://getcomposer.org/download/2.2.22/composer.phar -o /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer

# --- CONFIGURAÇÕES DE PERMISSÃO PARA O LARAVEL ---

# 1. Garante que o usuário www-data existe e é o dono do WORKDIR
RUN chown -R www-data:www-data /var/www/html

# 2. Copia e define o entrypoint.sh (relativo ao contexto de build: ./php/entrypoint.sh)
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Altera o ponto de entrada para rodar o script de permissão antes do Apache
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

WORKDIR /var/www/html