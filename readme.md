# Hi, Guys! 

<h3 align="center">⚙️ Instruções para rodar o projeto:</h3>

> O arquivo *requests.rest*, usamos para teste localmente

As instruções são:

```
git clone https://github.com/Quest-Finder/temVagaMestre.back.git

npm install -> para instalar as dependências do projeto

criar um arquivo .env com as informações do seus banco de dados

executar as queries do arquivo queries.sql para criar as tabelas

npm run start:dev -> para rodar o servidor
npm run test:unit -> para rodar testes unitários
npm run test:e2e -> para rodar testes e2e

Instruções para preencher o arquivo dotenv:
```

criar um arquivo .env na pasta raiz com as seguintes variáveis:

```
    DB_USER = 
    DB_PASSWORD =
    DB_HOST = 
    DB_PORT = 
    DB_SCHEMA =
```

Preencher as variáveis com as informações do seu banco de dados.

Ainda no .env, preencher também as variáveis:


    JWT_KEY: ,                  (palavra passe, que vamos definir e deixar no Notion do BACKEND OK?)
    BCRYPT_COST: ,              (cost da lib Bcrypt, geralmente 12   *no nosso caso vamos usar 12*)
    ACCESS_TOKEN_EXPIRES_IN = 1day (esse vai ser o tempo para o token expirar menos de um dia fica ruim para testes)
    NODE_ENV = "test" para rodar os testes e "production" para rodar o projeto localmente
    
    ***OBS: Se o NODE_ENV for setado para "test", isso significa que o banco de dados que será utilizado será o in memory database do sqlite. Qualquer outro nome que for setado para o NODE_ENV, utilizará o banco de dados do MySQL, que mais tarde será o banco de dados de produção.

---

<h3 align="center">🛠 Ferramentas:</h3>
- Typescript
- Node.js
- Nest.js
- MySQL
- Uuid
- JsonWebToken
- Knex
- Bcrypt
- Class Validator
---