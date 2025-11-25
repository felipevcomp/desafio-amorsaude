#!/bin/bash
set -e

# Corrige permissões
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

if [ ! -d /var/www/html/vendor ]; then
  echo "Instalando dependências PHP..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi


# Espera o banco ficar disponível
until php artisan migrate:status > /dev/null 2>&1; do
  echo "Banco ainda não disponível. Tentando novamente em 3 segundos..."
  sleep 3
done

php artisan key:generate --force
php artisan config:clear
php artisan route:clear
php artisan cache:clear
php artisan view:clear

# Executa migrations e seeders
php artisan migrate:refresh --seed --force

php artisan passport:install --force

exec "$@"
