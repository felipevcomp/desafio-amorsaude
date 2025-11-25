#!/bin/bash
set -e

# Corrige permissões
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# Espera o banco ficar disponível
until php artisan migrate:status > /dev/null 2>&1; do
  echo "Banco ainda não disponível. Tentando novamente em 3 segundos..."
  sleep 3
done

# Executa migrations e seeders
php artisan migrate:refresh --seed --force

php artisan passport:install


# Por fim, executa o comando padrão (por exemplo: apache2-foreground)
exec "$@"
