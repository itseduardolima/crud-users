# API CRUD de Usuários com NestJS

Uma API RESTful completa para gerenciamento de usuários construída com NestJS, TypeORM e MySQL. Este projeto implementa uma aplicação CRUD completa com validação, paginação, funcionalidade de busca e documentação Swagger.

## Funcionalidades

- 🔐 Gerenciamento completo de usuários (Criar, Ler, Atualizar, Excluir)
- ✅ Validação de entrada com class-validator
- 📝 Documentação da API com Swagger
- 📊 Paginação com nestjs-typeorm-paginate
- 🔍 Funcionalidade de busca
- 🔒 Criptografia de senha com bcrypt
- 🧩 UUID para IDs de usuários
- 🌐 Suporte a CORS
- ⚙️ Configuração baseada em variáveis de ambiente

## Tecnologias

- [NestJS](https://nestjs.com/) - Um framework progressivo para Node.js
- [TypeORM](https://typeorm.io/) - ORM para TypeScript e JavaScript
- [MySQL](https://www.mysql.com/) - Banco de dados relacional
- [Swagger](https://swagger.io/) - Documentação da API
- [class-validator](https://github.com/typestack/class-validator) - Validação
- [nestjs-typeorm-paginate](https://www.npmjs.com/package/nestjs-typeorm-paginate) - Paginação
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de senha

## Pré-requisitos

- Node.js
- MySQL 
- npm

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/itseduardolima/crud-users.git
cd crud-users
```

2. Instale as dependências:

```shell
npm install
```

3. Crie um arquivo `.env` no diretório raiz com as seguintes variáveis,:

```plaintext
DB_TYPE=mysql
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_SYNCHRONIZE=true
```

4. Inicie a aplicação:

```shell
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Documentação da API

A documentação Swagger está disponível em [http://localhost:3000/swagger](http://localhost:3000/swagger) quando a aplicação estiver em execução.

### Endpoints

| Método | Endpoint   | Descrição                          |
|--------|------------|------------------------------------|
| GET    | /users     | Obter todos os usuários (com paginação e busca) |
| GET    | /users/:id | Obter um usuário específico por ID |
| POST   | /users     | Criar um novo usuário              |
| PATCH  | /users/:id | Atualizar um usuário               |
| DELETE | /users/:id | Excluir um usuário                 |

### Paginação

A API suporta paginação para o endpoint `/users`:

```plaintext
GET /users?page=1&limit=10
```

### Busca

Você pode buscar usuários pelo nome:

```plaintext
GET /users?search=João
```

Você pode combinar busca com paginação:

```plaintext
GET /users?search=João&page=1&limit=10
```

## Validação de Dados

A API implementa as seguintes regras de validação:

1. **Nome** - Apenas letras
2. **Email** - Formato de email válido
3. **Matrícula** - Apenas números
4. **Senha** - Alfanumérica, 6 caracteres
5. Todos os campos são obrigatórios

## Estrutura do Projeto

```plaintext
src/
├── app.module.ts              # Módulo principal da aplicação
├── main.ts                    # Ponto de entrada da aplicação
├── common/                    # Utilitários comuns e DTOs
│   ├── dto/
│   │   └── pagination-query.dto.ts
├── config/                    # Módulos de configuração
│   └── database/
│       ├── database.module.ts
│       └── database-config.service.ts
└── users/                     # Módulo de usuários
    ├── dto/
    │   ├── create-user.dto.ts
    │   ├── update-user.dto.ts
    │   └── search-user.dto.ts
    ├── entities/
    │   └── user.entity.ts
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
```
