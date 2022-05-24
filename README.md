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
  - [POST - /users](#21-criação-de-usuário)
  - [POST - /users/login](#22-fazer-login)
  - [GET - /users](#23-listando-usuários)
  - [GET - /users/:user_id](#24-listar-usuário-por-id)
  - [GET - /users/me/info](#25-listar-usuário-logado)
  - [GET - /users/me/feed](#26-listar-feed-de-usuário-logado)
  - [PATCH - /users/:id](#27-atualizar-usuário)
  - [DELETE - /users/:id](#28-excluir-usuário)
- [Posts](#3-posts)
- [Donations](#4-donations)

---

## 1. **Users**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo       | Tipo    | Descrição                                    |
| ----------- | ------- | -------------------------------------------- |
| id          | string  | Identificador único do usuário               |
| name        | string  | O nome do usuário.                           |
| description | string  | A descrição / bio do usuário.                |
| email       | string  | O e-mail do usuário.                         |
| password    | string  | A senha de acesso do usuário                 |
| is_admin    | boolean | Define se um usuário é Administrador ou não. |
| created_at  | Date    | Data de criação do usuário.                  |
| updated_at  | Date    | Data de atualização do usuário.              |

### Endpoints

| Método | Rota           | Descrição                                          |
| ------ | -------------- | -------------------------------------------------- |
| POST   | /users         | Criação de um usuário.                             |
| POST   | /users/login   | Faz login com os dados de um usuário.              |
| GET    | /users         | Lista todos os usuários.                           |
| GET    | /users/:id     | Lista um usuário usando seu ID como parâmetro      |
| GET    | /users/me/info | Lista o usuário que está logado atualmente         |
| GET    | /users/me/feed | Lista o feed do usuário que está logado atualmente |
| PATCH  | /users/:id     | Atualiza um usuário usando seu ID como parâmetro   |
| DELETE | /users/:id     | Apaga um usuário usando seu ID como parâmetro      |

---

### 1.1. **Criação de Usuário**

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
  "description": "Sou uma descrição daquelas Amazing",
  "is_admin": true
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
  "password": "$2b$10$zjbYnAwqymrrfcSiq6.vLeBj57TtZhW15/MqGARUG5yRCSCWxXGoK",
  "description": "Sou uma descrição daquelas Amazing",
  "is_admin": true,
  "created_at": "2022-05-23T23:26:02.737Z",
  "updated_at": "2022-05-23T23:26:02.737Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad Request | Email already exists. |

---

### 1.2. **Fazer login**

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

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad Request | Wrong email/password. |

---

### 1.3. **Listando Usuários**

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
    "email": "RaphaelFelipeMLima@kenzie.com.br",
    "description": "Sou uma descrição daquelas Amazing",
    "is_admin": true,
    "created_at": "2022-05-23T23:26:02.737Z",
    "updated_at": "2022-05-23T23:26:02.737Z"
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
  "email": "RaphaelFelipeMLima@kenzie.com.br",
  "description": "Sou uma descrição daquelas Amazing",
  "is_admin": true,
  "created_at": "2022-05-23T23:26:02.737Z",
  "updated_at": "2022-05-23T23:26:02.737Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição       |
| --------------- | --------------- |
| 400 Bad Request | User not found. |

---

### 1.5. **Listar Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me/info`

### Exemplo de Request:

```
GET /users/me/inf2
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
  "password": "$2b$10$5r0Gbu/5RcxHwMxiF7188esfFtsKwoy/D3HzQ3dTdjuef0JH.o6qC",
  "created_at": "2022-05-23T23:52:26.173Z",
  "updated_at": "2022-05-23T23:52:26.173Z",
  "is_admin": true
}
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

### 1.6. **Listar Feed de Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me/info`

### Exemplo de Request:

```
GET /users/me/inf2
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

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

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

### Corpo da Requisição:

```json
{
  "email": "OswaldoDeco@kenzie.com.br",
  "name": "Oswaldo Deco"
}
```

### Exemplo de Response:

```
200 OK
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

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

### 1.8. **Excluir Usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/faea5cca-e10d-4440-9849-c19610d6aabf
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
  "message": "User deleted with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | Invalid token.  |
| 400 Bad Request  | User not found. |

---

## 2. **Projects**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo    | Tipo    | Descrição                                    |
| -------- | ------- | -------------------------------------------- |
| id       | string  | Identificador único do usuário               |
| name     | string  | O nome do usuário.                           |
| email    | string  | O e-mail do usuário.                         |
| password | string  | A senha de acesso do usuário                 |
| isAdm    | boolean | Define se um usuário é Administrador ou não. |

### Endpoints

| Método | Rota           | Descrição                                          |
| ------ | -------------- | -------------------------------------------------- |
| POST   | /users         | Criação de um usuário.                             |
| POST   | /users/login   | Faz login com os dados de um usuário.              |
| GET    | /users         | Lista todos os usuários.                           |
| GET    | /users/:id     | Lista um usuário usando seu ID como parâmetro      |
| GET    | /users/me/info | Lista o usuário que está logado atualmente         |
| GET    | /users/me/feed | Lista o feed do usuário que está logado atualmente |
| PATCH  | /users/:id     | Atualiza um usuário usando seu ID como parâmetro   |
| DELETE | /users/:id     | Apaga um usuário usando seu ID como parâmetro      |

---

### 2.1. **Criação de Usuário**

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
  "description": "Sou uma descrição daquelas Amazing",
  "is_admin": true
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
  "password": "$2b$10$zjbYnAwqymrrfcSiq6.vLeBj57TtZhW15/MqGARUG5yRCSCWxXGoK",
  "description": "Sou uma descrição daquelas Amazing",
  "is_admin": true,
  "created_at": "2022-05-23T23:26:02.737Z",
  "updated_at": "2022-05-23T23:26:02.737Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad Request | Email already exists. |

---

### 2.2. **Fazer login**

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

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad Request | Wrong email/password. |

---

### 2.3. **Listando Usuários**

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
    "email": "RaphaelFelipeMLima@kenzie.com.br",
    "description": "Sou uma descrição daquelas Amazing",
    "is_admin": true,
    "created_at": "2022-05-23T23:26:02.737Z",
    "updated_at": "2022-05-23T23:26:02.737Z"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.4. **Listar Usuário por ID**

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
  "email": "RaphaelFelipeMLima@kenzie.com.br",
  "description": "Sou uma descrição daquelas Amazing",
  "is_admin": true,
  "created_at": "2022-05-23T23:26:02.737Z",
  "updated_at": "2022-05-23T23:26:02.737Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição       |
| --------------- | --------------- |
| 400 Bad Request | User not found. |

---

### 2.5. **Listar Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me/info`

### Exemplo de Request:

```
GET /users/me/inf2
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
  "password": "$2b$10$5r0Gbu/5RcxHwMxiF7188esfFtsKwoy/D3HzQ3dTdjuef0JH.o6qC",
  "created_at": "2022-05-23T23:52:26.173Z",
  "updated_at": "2022-05-23T23:52:26.173Z",
  "is_admin": true
}
```

### Possíveis Erros:

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

### 2.6. **Listar Feed de Usuário Logado**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/me/info`

### Exemplo de Request:

```
GET /users/me/inf2
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

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

### 2.7. **Atualizar Usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/faea5cca-e10d-4440-9849-c19610d6aabf
Host: https://api-onganizer.herokuapp.com/
Authorization: Bearer <token>
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "OswaldoDeco@kenzie.com.br",
  "name": "Oswaldo Deco"
}
```

### Exemplo de Response:

```
200 OK
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

| Código do Erro   | Descrição      |
| ---------------- | -------------- |
| 401 Unauthorized | Invalid token. |

---

### 2.8. **Excluir Usuário**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:id`

### Exemplo de Request:

```
PATCH /users/faea5cca-e10d-4440-9849-c19610d6aabf
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
  "message": "User deleted with success"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição       |
| ---------------- | --------------- |
| 401 Unauthorized | Invalid token.  |
| 400 Bad Request  | User not found. |

---
