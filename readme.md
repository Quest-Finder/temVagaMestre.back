# Hi, Guys! 

<h3 align="center">⚙️ Instruções para rodar o projeto:</h3>

> O arquivo *requests.rest*, usamos para teste localmente

As instruções são:

```
git clone https://github.com/Quest-Finder/temVagaMestre.back.git

npm install -> para instalar as dependências do projeto

criar um arquivo .env com as informações do seus banco de dados

executar as queries do arquivo queries.sql para criar as tabelas

npm run dev -> para rodar o servidor
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

---

<h3 align="center">🛠 Ferramentas:</h3>
- Typescript</br>
- Node.js</br>
- MySQL</br>
- Express</br>
- Uuid</br>
- JsonWebToken</br>
- Knex</br>
- Bcrypt</br>

---