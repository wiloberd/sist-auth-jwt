## API de Autenticação com Node.js 

Esta é uma API básica de autenticação criada com Node.js que inclui proteção de rota. A API permite o registro, leitura, atualização e exclusão de usuários, assim como login e acesso a rotas protegidas apenas para usuários autenticados.

## Tecnologias Utilizadas

- Node.js
- Typescript
- Express.js
- JWT (JSON Web Token)
- Sqlite3
- Zod
- Dotenv

## Instalação

1. Clone este repositório:

    - git clone https://github.com/wiloberd/sist-auth-jwt.git

2. Navegue na pasta do projeto:
    - cd sist-auth-jwt
3. Instale as dependência:
    - npm install
4. Configure as variáveis de ambiente:
    - Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

    {

        PORT =3000
        JWT_TOKEN =uma-chave-secreta-jwt
    }

## Inicie o servidor:

npm run dev

## Registro de Usuário
- URL: /users/
- Método: POST
- Descrição: Registra um novo usuário.
- Body:

```bash
 {
    "nome": "Seu Nome",
    "sobrenome": "Seu Sobrenome",
    "usuario": "SeuUsuario",
    "email": "seuemail@example.com",
    "senha": "SuaSenha"
  }
```

## Login de Usuário
- URL: /login/
- Método: POST
- Descrição: Faz login de um usuário e retorna um token JWT.
- Body:
```bash
  {
    "usuario": "SeuUsuario",
    "senha": "SuaSenha"
  }
```
Resposta de Sucesso:
```bash
{
  "auth": true,
  "token": "valor-do-token-jwt"
}
```

## Rota Protegida
- URL: /users/
- Método: GET
- Descrição: Acessa uma rota protegida usando um token no header da requisição.
- Headers:
```bash
  {	
  "x-access-token": "valor-do-token-jwt"
  }
```
Resposta de Sucesso:
```bash
[
  {
    "id": "ID do usuário 1",
    "nome": "Nome do usuário 1",
    "sobrenome": "Sobrenome do usuário 1",
    "usuario": "Nome de usuário 1",
    "email": "Email do usuário 1"
  },
  {
    "id": "ID do usuário 2",
    "nome": "Nome do usuário 2",
    "sobrenome": "Sobrenome do usuário 2",
    "usuario": "Nome de usuário 2",
    "email": "Email do usuário 2"
  }
]

```