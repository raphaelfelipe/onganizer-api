# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [UUID](https://www.npmjs.com/package/uuid)
- [pg](https://www.npmjs.com/package/pg)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [Commitizen](https://www.npmjs.com/package/commitizen)
- [Jest](https://www.npmjs.com/package/jest)
- [UUID-validate](https://www.npmjs.com/package/uuid-validate)

A URL base da aplicação:
https://api-onganizer.herokuapp.com/

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](./src/img/Capstone%20M4.drawio.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [POST - /users/login](#12-fazer-login)
  - [GET - /users](#13-listando-usuários)
  - [GET - /users/:user_id](#14-listar-usuário-por-id)
  - [GET - /users/me/info](#15-listar-usuário-logado)
  - [GET - /users/me/feed](#16-listar-feed-de-usuário-logado)
  - [PATCH - /users/:id](#17-atualizar-usuário)
  - [DELETE - /users/:id](#18-excluir-usuário)
- [Projects](#2-projects)
  - [POST - /project](#21-criação-de-projeto)
  - [GET - /project](#22-listando-projetos)
  - [GET - /project/:id](#23-listar-projeto-por-id)
  - [GET - /project/:id/users](#24-listar-usuarios-por-projeto)
  - [GET - /project/:id/posts](#25-listar-usuarios-por-posts)
  - [POST - /project/follow/:id](#26-seguir-projeto)
  - [DELETE - /project/follow/:id](#27-parar-de-seguir-um-projeto)
  - [POST - /project/:id/users](#28-adicionar-admin-ao-projeto)
  - [POST - /project/:id/posts](#29-criar-post-no-projeto)
  - [PATCH - /project/:id](#210-atualizar-projeto)
  - [DELETE - /project/:id](#211-excluir-projeto)
- [Posts](#3-posts)
  - [GET - /posts](#31-listar-post-por-id)
  - [GET - /posts/:id/comments](#32-listar-comentarios-por-post)
  - [GET - /posts/comments/:id](#33-listar-comentario-por-id)
  - [POST - /posts/:id/comments](#34-criar-comentario-em-post)
  - [PATCH - /posts/comments/:id](#35-atualizar-comentario)
  - [DELETE - /posts/comments/:id](#36-excluir-comentario)
  - [PATCH - /posts/:id](#37-atualizar-post)
  - [DELETE - /posts/:id](#38-excluir-post)
- [Donations](#4-donations)
  - [GET - /donations](#41-listar-doacao-por-id)
  - [GET - /donations/user/:id](#42-listar-doacoes-por-usuario)
  - [GET - /donations/project/:id](#43-listar-doacoes-por-projeto)
  - [POST - /donations/project/:id](#44-atualizar-doacao)
  - [PATCH - /donations/:id](#45-atualizar-doacao)

---

## 1. **Users**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo       | Tipo   | Descrição                       |
| ----------- | ------ | ------------------------------- |
| id          | string | Identificador único do usuário. |
| name        | string | Nome do usuário.                |
| description | string | Descrição do usuário.           |
| email       | string | E-mail de acesso do usuário.    |
| password    | string | Senha de acesso do usuário.     |
| created_at  | Date   | Data de criação do usuário.     |
| updated_at  | Date   | Data de atualização do usuário. |

### Endpoints

| Método | Rota           | Descrição                                                 |
| ------ | -------------- | --------------------------------------------------------- |
| POST   | /users         | Cria um usuário.                                          |
| POST   | /users/login   | Faz login com o email e senha do usuário.                 |
| GET    | /users         | Lista todos os usuários.                                  |
| GET    | /users/:id     | Lista um usuário usando seu ID como parâmetro.            |
| GET    | /users/me/info | Lista as informações do usuário que está logado.          |
| GET    | /users/me/feed | Lista os posts dos projetos seguidos pelo usuário logado. |
| PATCH  | /users/:id     | Atualiza um usuário usando seu ID como parâmetro.         |
| DELETE | /users/:id     | Exclui um usuário usando seu ID como parâmetro.           |

---

### 1.1. **Criar Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
POST /users
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Raphael Felipe M Lima",
  "email": "RaphaelFelipeMLima@kenzie.com.br",
  "password": "123456",
  "description": "Sou uma descrição daquelas Amazing"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "bc5e288f-ca5a-4f61-9d73-cfc454a40296",
  "name": "Raphael Felipe M Lima",
  "email": "RaphaelFelipeMLima@kenzie.com.br",
  "description": "Sou uma descrição daquelas Amazing",
  "created_at": "2022-05-23T23:26:02.737Z",
  "updated_at": "2022-05-23T23:26:02.737Z"
}
```

### Possíveis Erros:

| Código do Erro           | Descrição                       |
| ------------------------ | ------------------------------- |
| 422 Unprocessable Entity | Missing name, email or password |
| 409 Conflict             | Email already in use            |

---

### 1.2. **Fazer Login**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/login`

### Exemplo de Request:

```
POST /users/login
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "RaphaelFelipeMLima@kenzie.com.br",
  "password": "123456"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlJhcGhhZWxGZWxpcGVNTGltYUBrZW56aWUuY29tLmJyIiwiaWQiOiJiYzVlMjg4Zi1jYTVhLTRmNjEtOWQ3My1jZmM0NTRhNDAyOTYiLCJpYXQiOjE2NTMzNDgzOTYsImV4cCI6MTY1Mzk1MzE5Nn0.mrknYX1j5siSPE4Cyg0vh09TL--d05rANGJ4MCByJ0A"
}
```

### Possíveis Erros:

| Código do Erro           | Descrição              |
| ------------------------ | ---------------------- |
| 422 Unprocessable Entity | Missing email/password |
| 403 Forbidden            | Wrong email/password   |

---

### 1.3. **Listar Todos os Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
GET /users
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "bc5e288f-ca5a-4f61-9d73-cfc454a40296",
    "name": "Raphael Felipe M Lima",
    "description": "Sou uma descrição daquelas Amazing"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.4. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
GET /users/bc5e288f-ca5a-4f61-9d73-cfc454a40296
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "bc5e288f-ca5a-4f61-9d73-cfc454a40296",
  "name": "Raphael Felipe M Lima",
  "description": "Sou uma descrição daquelas Amazing"
}
```

### Possíveis Erros:

| Código do Erro | Descrição      |
| -------------- | -------------- |
| 404 Not Found  | User not found |

---

### 1.5. **Listar Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me/info`

### Exemplo de Request:

```
GET /users/me/info
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "faea5cca-e10d-4440-9849-c19610d6aabf",
  "email": "RaphaelFelipeMLima@kenzie.com.br",
  "name": "Raphael Felipe M Lima",
  "description": "Sou uma descrição daquelas Amazing",
  "created_at": "2022-05-23T23:52:26.173Z",
  "updated_at": "2022-05-23T23:52:26.173Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição     |
| ---------------- | ------------- |
| 401 Unauthorized | Invalid token |

---

### 1.6. **Listar Feed de Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me/feed`

### Exemplo de Request:

```
GET /users/me/feed
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[]
```

### Possíveis Erros:

| Código do Erro   | Descrição     |
| ---------------- | ------------- |
| 401 Unauthorized | Invalid token |

---

### 1.7. **Atualizar Usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
{
  "email": "OswaldoDeco@kenzie.com.br",
  "name": "Oswaldo Deco"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "user": {
    "message": "User successfully updated",
    "UpdatedInfo": {
      "name": "Oswaldo Deco",
      "email": "OswaldoDeco@kenzie.com.br"
    }
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 409 Conflict     | Email already taken |
| 404 Not Found    | User not found      |
| 401 Unauthorized | Invalid token       |

---

### 1.8. **Excluir Usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
DELETE /users/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "User deleted with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 401 Unauthorized | Unauthorized access |
| 404 Not Found    | User not found      |
| 401 Unauthorized | Invalid token       |

---

## 2. **Projects**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Project é definido como:

| Campo       | Tipo    | Descrição                            |
| ----------- | ------- | ------------------------------------ |
| id          | string  | Identificador único do projeto.      |
| name        | string  | Nome do projeto.                     |
| description | string  | Descrição do projeto.                |
| objective   | string  | Objetivo do projeto.                 |
| active      | boolean | Status do projeto.                   |
| users       | Array   | Lista de administradores do projeto. |
| created_at  | Date    | Data de criação do projeto.          |
| updated_at  | Date    | Data de atualização do projeto.      |

### Endpoints

| Método | Rota                | Descrição                                                          |
| ------ | ------------------- | ------------------------------------------------------------------ |
| POST   | /project            | Cria um projeto.                                                   |
| GET    | /project            | Lista todos os projetos.                                           |
| GET    | /project/:id        | Lista um projeto usando seu ID como parâmetro.                     |
| GET    | /project/:id/users  | Lista todos os usuários de um projeto.                             |
| GET    | /project/:id/posts  | Lista todos os posts de um projeto.                                |
| POST   | /project/follow/:id | Segue um projeto usando seu ID como parâmetro.                     |
| DELETE | /project/follow/:id | Deixa de seguir um projeto usando seu ID como parâmetro.           |
| POST   | /project/:id/users/ | Adiciona um administrador ao projeto usando seu ID como parâmetro. |
| POST   | /project/:id/posts/ | Cria um post em um projeto usando seu ID como parâmetro.           |
| PATCH  | /project/:id        | Atualiza um projeto usando seu ID como parâmetro.                  |
| DELETE | /project/:id        | Exclui um projeto usando seu ID como parâmetro.                    |

---

### 2.1. **Criar Projeto**

[ Voltar para os Endpoints ](#5-endpoints)

### `/project`

### Exemplo de Request:

```
POST /project
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Projeto animaravilhoso",
  "objective": "Arrecadar fundos para ajudar ONGs que cuidam de animais de rua",
  "description": "Ajude quem ajuda esses animaizinhos a encontrar um novo lar!"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "d78b7b9b-f9bd-4976-9e54-a06b24033bd9",
  "name": "Projeto animaravilhoso",
  "description": "Ajude quem ajuda esses animaizinhos a encontrar um novo lar!",
  "objective": "Arrecadar fundos para ajudar ONGs que cuidam de animais de rua",
  "active": true,
  "users": [
    {
      "id": "bc5e288f-ca5a-4f61-9d73-cfc454a40296",
      "name": "Raphael Felipe M Lima",
      "description": "Sou uma descrição daquelas Amazing"
    }
  ],
  "created_at": "2022-05-24T22:02:19.740Z",
  "updated_at": "2022-05-24T22:02:19.740Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição              |
| ---------------- | ---------------------- |
| 409 Conflict     | Project already exists |
| 401 Unauthorized | Invalid token          |

---

### 2.2. **Listar Todos os Projetos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project`

### Exemplo de Request:

```
GET /project
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "d78b7b9b-f9bd-4976-9e54-a06b24033bd9",
    "name": "Projeto animaravilhoso",
    "description": "Ajude quem ajuda esses animaizinhos a encontrar um novo lar!",
    "objective": "Arrecadar fundos para ajudar ONGs que cuidam de animais de rua",
    "created_at": "2022-05-24T22:02:19.740Z",
    "updated_at": "2022-05-24T22:02:19.740Z",
    "active": true
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar Projeto por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/:id`

### Exemplo de Request:

```
GET /project/d78b7b9b-f9bd-4976-9e54-a06b24033bd9
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "d78b7b9b-f9bd-4976-9e54-a06b24033bd9",
  "name": "Projeto animaravilhoso",
  "description": "Ajude quem ajuda esses animaizinhos a encontrar um novo lar!",
  "objective": "Arrecadar fundos para ajudar ONGs que cuidam de animais de rua",
  "created_at": "2022-05-24T22:02:19.740Z",
  "updated_at": "2022-05-24T22:02:19.740Z",
  "active": true
}
```

### Possíveis Erros:

| Código do Erro | Descrição         |
| -------------- | ----------------- |
| 404 Not Found  | Project not found |

---

### 2.4. **Listar Todos os Usuários de um Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/:id/users`

### Exemplo de Request:

```
GET /project/d78b7b9b-f9bd-4976-9e54-a06b24033bd9/users
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "85bdc868-c68e-4855-9d24-a116c04dd25e",
  "name": "Projeto animaravilhoso",
  "users": [
    {
      "id": "faea5cca-e10d-4440-9849-c19610d6aabf",
      "email": "OswaldoDeco@kenzie.com.br",
      "name": "Oswaldo Deco",
      "description": "Sou uma descrição daquelas Amazing"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro | Descrição         |
| -------------- | ----------------- |
| 404 Not Found  | Project not found |

---

### 2.5. **Listar Todos os Posts de um Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/:id/posts`

### Exemplo de Request:

```
GET /project/85bdc868-c68e-4855-9d24-a116c04dd25e/posts
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "ba3281e1-3797-41b7-868b-7627783bf7a5",
    "title": "Doação Canil",
    "content": "Doe e ajude esta causa!",
    "created_at": "2022-05-25T00:24:16.360Z",
    "updated_at": "2022-05-25T00:24:16.360Z"
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição         |
| -------------- | ----------------- |
| 404 Not Found  | Project not found |

---

### 2.6. **Seguir um Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/follow/:id`

### Exemplo de Request:

```
POST /project/follow/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "7a0192db-2967-4114-b4e3-788b34051cfa",
  "project_id": "d78b7b9b-f9bd-4976-9e54-a06b24033bd9",
  "user_id": "c8bc69f5-fa6e-4ff8-9478-1c7e5e5426ec",
  "created_at": "2022-05-24T23:30:14.296Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição         |
| ---------------- | ----------------- |
| 404 Not Found    | Project not found |
| 401 Unauthorized | Invalid token     |

---

### 2.7. **Parar de seguir um Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/follow/:id`

### Exemplo de Request:

```
DELETE /project/follow/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Project unfollowed"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Project not found. |
| 401 Unauthorized | Invalid token.     |

---

### 2.8. **Virar Administrador de um Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/:id/users`

### Exemplo de Request:

```
POST /project/faea5cca-e10d-4440-9849-c19610d6aabf/users
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "d78b7b9b-f9bd-4976-9e54-a06b24033bd9",
  "name": "Projeto animaravilhoso",
  "description": "Ajude quem ajuda esses animaizinhos a encontrar um novo lar!",
  "objective": "Arrecadar fundos para ajudar ONGs que cuidam de animais de rua",
  "created_at": "2022-05-24T22:02:19.740Z",
  "updated_at": "2022-05-24T22:02:19.740Z",
  "active": true,
  "users": [
    {
      "id": "faea5cca-e10d-4440-9849-c19610d6aabf",
      "email": "OswaldoDeco@kenzie.com.br",
      "name": "Oswaldo Deco",
      "description": "Sou uma descrição daquelas Amazing"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Project not found. |
| 401 Unauthorized | Invalid token.     |

---

### 2.9. **Criar Post em um Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/:id/posts`

### Exemplo de Request:

```
POST /project/faea5cca-e10d-4440-9849-c19610d6aabf/posts
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
{
  "title": "Doação Canil",
  "content": "Doe e ajude esta causa!"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "ba3281e1-3797-41b7-868b-7627783bf7a5",
  "title": "Doação Canil",
  "content": "Doe e ajude esta causa!",
  "project": {
    "id": "d78b7b9b-f9bd-4976-9e54-a06b24033bd9",
    "name": "Projeto animaravilhoso",
    "description": "Ajude quem ajuda esses animaizinhos a encontrar um novo lar!",
    "objective": "Arrecadar fundos para ajudar ONGs que cuidam de animais de rua",
    "created_at": "2022-05-24T22:02:19.740Z",
    "updated_at": "2022-05-24T22:02:19.740Z",
    "active": true
  },
  "created_at": "2022-05-25T00:24:16.360Z",
  "updated_at": "2022-05-25T00:24:16.360Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Project not found. |
| 401 Unauthorized | Invalid token.     |

---

### 2.10. **Atualizar Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/project/:id`

### Exemplo de Request:

```
PATCH /project/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
{
  "active": false,
  "objective": "Ajudar ONGs que cuidam de animais de rua",
  "name": "Projeto animarvelous",
  "description": "Ajude quem ajuda esses animais encontrando um novo lar!"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Project updated",
  "project": {
    "message": "Project successfully updated",
    "UpdatedInfo": {
      "name": "Projeto animarvelous",
      "description": "Ajude quem ajuda esses animais encontrando um novo lar!",
      "objective": "Ajudar ONGs que cuidam de animais de rua",
      "active": false
    }
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Project not found. |
| 401 Unauthorized | Invalid token.     |

---

### 2.11. **Excluir Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
DELETE /projects/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Project deleted with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 401 Unauthorized | Invalid token.     |
| 400 Bad Request  | Project not found. |

---

## 3. **Posts**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Post é definido como:

| Campo      | Tipo   | Descrição                    |
| ---------- | ------ | ---------------------------- |
| id         | string | Identificador único do post  |
| title      | string | O título do post.            |
| content    | string | O conteúdo do post.          |
| created_at | Date   | Data de criação do post.     |
| updated_at | Date   | Data de atualização do post. |

### Endpoints

| Método | Rota                 | Descrição                                                       |
| ------ | -------------------- | --------------------------------------------------------------- |
| GET    | /posts/:id           | Lista um post usando seu ID como parâmetro                      |
| GET    | /posts/:id/comments/ | Lista todos os comentários do post usando seu ID como parâmetro |
| GET    | /posts/comments/:id  | Lista um comentário usando seu ID como parâmetro                |
| POST   | /posts/:id/comments/ | Cria um comentário no post                                      |
| PATCH  | /posts/comments/:id  | Atualiza um comentário usando seu ID como parâmetro             |
| DELETE | /posts/comments/:id  | Apaga um comentário usando seu ID como parâmetro                |
| PATCH  | /posts/:id           | Atualiza um post usando seu ID como parâmetro                   |
| DELETE | /posts/:id           | Apaga um post usando seu ID como parâmetro                      |

---

### 3.1. **Listar Post por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/:id`

### Exemplo de Request:

```
GET /posts/ba3281e1-3797-41b7-868b-7627783bf7a5
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do post (Post) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "ba3281e1-3797-41b7-868b-7627783bf7a5",
  "title": "Doação Canil",
  "content": "Doe e ajude esta causa!",
  "created_at": "2022-05-25T00:24:16.360Z",
  "updated_at": "2022-05-25T00:24:16.360Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not Found  | Post not found. |

---

### 3.2. **Listar Comentários de um Post**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/:id/comments`

### Exemplo de Request:

```
GET /posts/ba3281e1-3797-41b7-868b-7627783bf7a5/comments
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do post (Post) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "4cb29d8f-21cd-4c94-8cd0-efc4cabe4db4",
    "post_id": "a703ccee-9074-465c-a55c-9735f26a9973",
    "user_id": "6ef24fb7-b530-4056-9791-97fdab109d8b",
    "comment": "Eu gosto de animais, vou ajudar com certeza!",
    "created_at": "2022-05-25T01:41:03.991Z",
    "updated_at": "2022-05-25T01:41:03.991Z"
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not Found  | Post not found. |

---

### 3.3. **Listar Comentário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/comments/:id`

### Exemplo de Request:

```
GET /posts/comments/4cb29d8f-21cd-4c94-8cd0-efc4cabe4db4
Host: https://api-onganizer.herokuapp.com/
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                   |
| --------- | ------ | ------------------------------------------- |
| id        | string | Identificador único do comentário (Comment) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "4cb29d8f-21cd-4c94-8cd0-efc4cabe4db4",
  "post_id": "a703ccee-9074-465c-a55c-9735f26a9973",
  "user_id": "6ef24fb7-b530-4056-9791-97fdab109d8b",
  "comment": "Eu gosto de animais, vou ajudar com certeza!",
  "created_at": "2022-05-25T01:41:03.991Z",
  "updated_at": "2022-05-25T01:41:03.991Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | Comment not found. |

---

### 3.4. **Criação de Comentário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/posts/:id/comments`

### Exemplo de Request:

```
POST /posts/ba3281e1-3797-41b7-868b-7627783bf7a5/comments
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do post (Post) |

### Corpo da Requisição:

```json
{
  "comment": "Eu gosto de animais, vou ajudar com certeza!"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "4cb29d8f-21cd-4c94-8cd0-efc4cabe4db4",
  "post_id": "a703ccee-9074-465c-a55c-9735f26a9973",
  "user_id": "6ef24fb7-b530-4056-9791-97fdab109d8b",
  "comment": "Eu gosto de animais, vou ajudar com certeza!",
  "created_at": "2022-05-25T01:41:03.991Z",
  "updated_at": "2022-05-25T01:41:03.991Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 404 Not Found    | Post not found. |
| 401 Unauthorized | Invalid token.  |

---

### 3.5. **Atualizar Comentário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/comments/:id`

### Exemplo de Request:

```
PATCH /posts/comments/4cb29d8f-21cd-4c94-8cd0-efc4cabe4db4
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                   |
| --------- | ------ | ------------------------------------------- |
| id        | string | Identificador único do comentário (Comment) |

### Corpo da Requisição:

```json
{
  "comment": "Eu gosto de animais, vou ajudar com certeza e chamar os amigos também!"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Comment updated",
  "comment": {
    "message": "Comment successfully updated",
    "UpdatedInfo": {
      "comment": "Eu gosto de animais, vou ajudar com certeza e chamar os amigos também!"
    }
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Comment not found. |
| 401 Unauthorized | Invalid token.     |

---

### 3.6. **Excluir Comentário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/comments/:id`

### Exemplo de Request:

```
DELETE /posts/comments/4cb29d8f-21cd-4c94-8cd0-efc4cabe4db4
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                   |
| --------- | ------ | ------------------------------------------- |
| id        | string | Identificador único do comentário (Comment) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Comment deleted with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 401 Unauthorized | Invalid token.     |
| 400 Bad Request  | Comment not found. |

---

### 3.7. **Atualizar Post**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/:id`

### Exemplo de Request:

```
PATCH /posts/ba3281e1-3797-41b7-868b-7627783bf7a5
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do post (Post) |

### Corpo da Requisição:

```json
{
  "title": "Doação Canil!!!",
  "content": "Doe e ajude esta causa, precisamos de você!"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Post successfully updated",
  "UpdatedInfo": {
    "title": "Doação Canil!!!",
    "content": "Doe e ajude esta causa, precisamos de você!"
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 404 Not Found    | Post not found. |
| 401 Unauthorized | Invalid token.  |

---

### 3.8. **Excluir Post**

[ Voltar aos Endpoints ](#5-endpoints)

### `/posts/:id`

### Exemplo de Request:

```
DELETE /posts/ba3281e1-3797-41b7-868b-7627783bf7a5
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do post (Post) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "message": "Post deleted with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | Invalid token.  |
| 400 Bad Request  | Post not found. |

---

## 4. **Donations**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto Donations é definido como:

| Campo      | Tipo   | Descrição                      |
| ---------- | ------ | ------------------------------ |
| id         | string | Identificador único da doação  |
| message    | string | A mensagem da doação.          |
| value      | number | O valor do doação.             |
| created_at | Date   | Data da doação.                |
| updated_at | Date   | Data de atualização da doação. |

### Endpoints

| Método | Rota                    | Descrição                                        |
| ------ | ----------------------- | ------------------------------------------------ |
| GET    | /donations/:id          | Lista uma doação usando seu ID como parâmetro    |
| GET    | /donations/user/:id     | Lista doações de um usuário                      |
| GET    | /donations/project/:id  | Lista doações de um projeto                      |
| POST   | /donations/project/:id/ | Faz doação para um projeto                       |
| PATCH  | /donations/:id          | Atualiza uma doação usando seu ID como parâmetro |

---

### 4.1. **Listar Doação por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/donations/:id`

### Exemplo de Request:

```
GET /donations/e38b74a1-a5af-44a5-905d-b0bfe99bf04d
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único da doação (Donation) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "e38b74a1-a5af-44a5-905d-b0bfe99bf04d",
  "message": "Doe e ajude esta causa!",
  "value": 100,
  "created_at": "2022-05-25T00:24:16.360Z",
  "updated_at": "2022-05-25T00:24:16.360Z"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 404 Not Found    | Donation not found. |
| 401 Unauthorized | Invalid token.      |

---

### 4.2. **Listar Doações de Usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/donations/user/:id`

### Exemplo de Request:

```
GET /donations/user/6ef24fb7-b530-4056-9791-97fdab109d8b
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "e38b74a1-a5af-44a5-905d-b0bfe99bf04d",
    "message": "Doe e ajude esta causa!",
    "value": 100,
    "created_at": "2022-05-25T00:24:16.360Z",
    "updated_at": "2022-05-25T00:24:16.360Z"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 404 Not Found    | User not found. |
| 401 Unauthorized | Invalid token.  |

---

### 4.3. **Listar Doações de Projeto**

[ Voltar aos Endpoints ](#5-endpoints)

### `/donations/project/:id`

### Exemplo de Request:

```
GET /donations/project/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "e38b74a1-a5af-44a5-905d-b0bfe99bf04d",
    "message": "Doe e ajude esta causa!",
    "value": 100,
    "created_at": "2022-05-25T00:24:16.360Z",
    "updated_at": "2022-05-25T00:24:16.360Z"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Project not found. |
| 401 Unauthorized | Invalid token.     |

---

### 4.4. **Criação de Doação**

[ Voltar para os Endpoints ](#5-endpoints)

### `/donations/project/:id`

### Exemplo de Request:

```
POST /donations/project/ba3281e1-3797-41b7-868b-7627783bf7a5
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único do projeto (Project) |

### Corpo da Requisição:

```json
{
  "message": "Doe e ajude esta causa!",
  "value": 100
}
```

### Exemplo de Response:

```
201 Created
```

```json
{}
```

### Possíveis Erros:

| Código do Erro   | Descrição          |
| ---------------- | ------------------ |
| 404 Not Found    | Project not found. |
| 401 Unauthorized | Invalid token.     |

---

### 4.5. **Atualizar Doação**

[ Voltar aos Endpoints ](#5-endpoints)

### `/donations/:id`

### Exemplo de Request:

```
PATCH /donations/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| id        | string | Identificador único da doação (Donation) |

### Corpo da Requisição:

```json
{
  "message": "Doei e ajudei esta causa!"
}
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "e38b74a1-a5af-44a5-905d-b0bfe99bf04d",
    "message": "Doei e ajudei esta causa!",
    "value": 100,
    "created_at": "2022-05-25T00:24:16.360Z",
    "updated_at": "2022-05-25T00:24:16.360Z"
  }
]
```

### Possíveis Erros:

| Código do Erro   | Descrição           |
| ---------------- | ------------------- |
| 404 Not Found    | Donation not found. |
| 401 Unauthorized | Invalid token.      |

---
