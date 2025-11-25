
# Projeto - API Laravel 5.4 + Angular 17 Frontend

Este projeto é composto por:

- **Backend:** Laravel **5.4** com PHP **7.0**
- **Autenticação:** Laravel **Passport**
- **Frontend:** Angular 17
- **Banco de dados MySQL:** **InnoDB** com Eloquent + Seeders e Factories para população do banco
- **Cache:** Redis configurado para rotas de clínicas e usuários
- **Padrões utilizados:** Repository Pattern, Services, Interfaces
- **Ambiente:** Docker configurado para rodar a API, banco e cache
- **Integração:** Token Bearer retornado pelo Passport e enviado automaticamente pelo Angular

---

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

---

# Backend (Laravel 5.4)

## Tecnologias utilizadas

- PHP **7.0**
- Laravel **5.4**
- Laravel **Passport** (OAuth2 / Bearer Token)
- MySQL **InnoDB** (via Docker)
- Redis (cache)

---

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

---

## Interfaces

Cada repositório possui sua **Interface**, garantindo um contrato fixo:

```php
interface ClinicRepositoryInterface {
    public function getAll();
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
```

---

## Service Layer

As regras de negócio ficam em:

    app/Services/

O Controller apenas consome:

```php
$this->clinicService->create($request->all());
```

---

# Cache (Redis)

O projeto utiliza **Redis** para cache de rotas importantes como:

- `/clinics`
- `/users`

Exemplo de uso em rota de clínicas:

```php
$page = request()->get('page', 1);

return Cache::remember('clinics.all.page.' . $page, 60, function () {
    return $this->clinic->with(['regional', 'specialties'])->paginate(10);
});
```

---

# Autenticação (Laravel Passport)

O projeto utiliza **Passport**, permitindo:

- Login com geração de token
- Autenticação via *Bearer Token*
- Middleware `auth:api` nas rotas
- Suporte para SPA/Mobile

Instalação usada:

```bash
php artisan migrate
php artisan passport:install
```

Exemplo de resposta de login:

```json
{
  "token": "eyJ0eXAiOiJKV..."
}
```

---

# Frontend (Angular)

## Tecnologias:

- Angular (última versão compatível)
- Reactive Forms
- HttpInterceptor para envio automático do Bearer
- AuthGuard
- Services e estrutura modular
- Login com validação e toggle de senha
- Components reutilizáveis (criar/editar)

---

# Rodando o Projeto

## Backend via Docker

Antes de rodar o Docker Compose, copie o arquivo `.env.example` para `.env` dentro da pasta `api`:

```bash
cp api/.env.example api/.env
```

Subir ambiente:

```bash
docker compose up -d
```

Após subir o ambiente, os seeders e factories irão popular o banco de dados. Caso os dados não estejam presentes, rode os comandos abaixo:

```bash
docker exec -it app php artisan migrate --seed
```

Usuário padrão criado pelo seeder:

- **email:** user@email.com
- **senha:** password

---

## Frontend

O container Node já está configurado para instalar dependências e servir a aplicação. Acesse:

```
http://localhost:4200
```

---

# Comandos Úteis

### Laravel

```bash
php artisan migrate
php artisan migrate:fresh --seed
php artisan passport:install
php artisan make:controller
php artisan make:model -m
```

### Angular

```bash
ng generate component pages/clinic-form
ng generate service services/clinic
ng generate guard auth
```

### Docker

```bash
docker compose up -d
docker compose down
docker exec -it <container> bash
```

---

# Observações

- O token é salvo pelo frontend e enviado automaticamente.
- Login utiliza Passport e responde com *accessToken*.
- Repository Pattern garante uma arquitetura limpa e testável.
- Interfaces desacoplam Controllers das implementações.
- MySQL utiliza **InnoDB** em todas as tabelas.
- Redis está configurado para cache de rotas importantes.
- O `.env` deve sempre ser criado antes de subir o Docker.