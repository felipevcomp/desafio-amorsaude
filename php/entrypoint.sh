#!/bin/bash
set -e

# Corrige permissões
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# Aguarda o banco subir
echo "Aguardando MySQL..."
until php -r "try { new PDO('mysql:host=${DB_HOST};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}'); } catch (Exception \$e) { exit(1); }"; do
  sleep 3
done

# Verifica se já existem usuários
USER_COUNT=$(php artisan tinker --execute="echo DB::table('users')->count();")

if [ "$USER_COUNT" -eq "0" ]; then
    echo "Nenhum dado encontrado. Rodando migrations + seeders..."
    php artisan migrate:fresh --seed
else
    echo "Seeders já rodaram anteriormente. Pulando..."
fi

exec "$@"
