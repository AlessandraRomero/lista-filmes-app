# Lista de Filmes App

Este projeto é uma aplicação Next.js que utiliza Tailwind CSS para estilização, Axios para requisições HTTP, Prisma como ORM para interagir com o banco de dados

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Configuração do Ambiente

1. **Clone o Repositório**

  - git clone https://github.com/AlessandraRomero/lista-filmes-app.git
  - cd lista-filmes-app

2. **Instalar Dependências**
   
   - npm install
     ou
   - yarn install

3. **Configurar o Banco de Dados PostgreSQL**
   
   - crie um novo bancao de dados
   - Anote o nome do banco de dados, o usuário e a senha, pois você precisará dessas informações no próximo passo.

4. **Configurar Variáveis de Ambiente**
   
   - Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

   - DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco_de_dados"
   - TMDB_API_KEY="sua-chave-tmdb"


    TMDB_API_KEY: Sua chave da API do TMDB, que pode ser obtida site da [The Movie Database](https://www.themoviedb.org/?language=pt-br) 

5. **Configurar Prisma**
   - execute o comando para aplicar as migrações e gerar o cliente Prisma:

     npx prisma migrate dev --name init

6. **Executar o Projeto**    

   - npm run dev
     ou
   - yarn dev

   O projeto estará disponível em http://localhost:3000.
