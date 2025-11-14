# Projeto - API Laravel 5.4 + Angular 17 Frontend

Este projeto é composto por:

- **Backend:** Laravel **5.4** com PHP **7.0**
- **Autenticação:** Laravel **Passport**
- **Frontend:** Angular 17
- **Banco de dados MySQL:** Eloquent + Seeders e Factories para população do banco 
- **Padrões utilizados:** Repository Pattern, Services, Interfaces
- **Ambiente:** Docker configurado para rodar a API e o banco
- **Integração:** Token Bearer retornado pelo Passport e enviado
  automaticamente pelo Angular

------------------------------------------------------------------------

## Estrutura Geral do Projeto

    /
    ├── backend/        → API Laravel 5.4
    │   ├── app/
    │   │   ├── Models/
    │   │   ├── Http/Controllers/
    │   │   ├── Repositories/
    │   │   │   └── Interfaces/
    │   │   ├── Services/
    │   │   └── ...
    │   ├── routes/api.php
    │   ├── database/
    │   └── ...
    │
    ├── frontend/       → Angular
    │   ├── src/app/
    │   │   ├── services/
    │   │   ├── interceptors/
    │   │   ├── guards/
    │   │   ├── pages/
    │   │   └── components/
    │   └── ...
    │
    ├── docker-compose.yml
    └── README.md

------------------------------------------------------------------------

# Backend (Laravel 5.4)

## Tecnologias utilizadas

- PHP **7.0**
- Laravel **5.4**
- Laravel **Passport** (OAuth2 / Bearer Token)
- MySQL (via Docker)

------------------------------------------------------------------------

# Padrões de Arquitetura

## Repository Pattern

O projeto segue o padrão *Repository Pattern* para desacoplar o Eloquent
da regra de negócio.

Estrutura típica:

    app/Repositories/
    ├── Interfaces/
    │   └── ClinicRepositoryInterface.php
    └── Eloquent/
        └── ClinicRepository.php

### Benefícios:

- Desacoplamento entre Controller e Eloquent
- Facilita testes
- Permite trocar Eloquent por outra fonte de dados
- Maior organização

------------------------------------------------------------------------

## Interfaces

Cada repositório possui sua **Interface**, garantindo um contrato fixo:

``` php
interface ClinicRepositoryInterface {
    public function getAll();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
```

Isso permite que os *Services* dependam de contratos, não
implementações.

------------------------------------------------------------------------

## Service Layer

As regras de negócio ficam em:

    app/Services/

O Controller apenas consome:

``` php
$this->clinicService->create($request->all());
```

------------------------------------------------------------------------

# Autenticação (Laravel Passport)

O projeto utiliza **Passport**, permitindo:

- Login com geração de token
- Autenticação via *Bearer Token*
- Middleware `auth:api` nas rotas
- Suporte para SPA/Mobile

Instalação usada:

``` bash
php artisan migrate
php artisan passport:install
```

Exemplo de resposta de login:

``` json
{
  "token": "eyJ0eXAiOiJKV..."
}
```

------------------------------------------------------------------------

# Frontend (Angular)

## Tecnologias:

- Angular (última versão compatível)
- Reactive Forms
- HttpInterceptor para envio automático do Bearer
- AuthGuard
- Services e estrutura modular
- Login com validação e toggle de senha
- Components reutilizáveis (criar/editar)

------------------------------------------------------------------------

# Rodando o Projeto

## Backend via Docker

Subir ambiente:

``` bash
docker compose up -d
```

Após subir o ambiente os seeders e factories irão popular o banco de dados. Caso os dados não estejam presentes, 
rode os comandos abaixo.

Instalar dependências:

``` bash
docker exec -it laravel-app composer install
```

Rodar migrations + seeds:

``` bash
docker exec -it laravel-app php artisan migrate --seed
```

Usuário padrão criado pelo seeder:

- **email:** user@email.com
- **senha:** password

------------------------------------------------------------------------

# Subindo o ambiente Angular

``` bash
cd frontend
npm install
ng serve
```

Frontend acessível em:

    http://localhost:4200

------------------------------------------------------------------------

# Comandos Úteis

### Laravel

``` bash
php artisan migrate
php artisan migrate:fresh --seed
php artisan passport:install
php artisan make:controller
php artisan make:model -m
```

### Angular

``` bash
ng serve -o
ng generate component pages/clinic-form
ng generate service services/clinic
ng generate guard auth
```

### Docker

``` bash
docker compose up -d
docker compose down
docker exec -it <container> bash
```

------------------------------------------------------------------------

# Observações

- O token é salvo pelo frontend e enviado automaticamente.
- Login utiliza Passport e responde com *accessToken*.
- Repository Pattern garante uma arquitetura limpa e testável.
- Interfaces desacoplam Controllers das implementações.

------------------------------------------------------------------------

# Sobre o Projeto

Este repositório é uma base sólida para aplicações **Laravel 5.4 +
Angular**, utilizando boas práticas modernas como Layers, Repositories,
Services, Interfaces e autenticação robusta via Passport.