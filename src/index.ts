// index.ts

import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import { cadastrarUsuario, verificarCredenciais } from "./userController"; // Importar a função de cadastro de usuário
import { openDb } from "./database"; // Importar a conexão com o banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos
app.use(express.static("public"));

// Rota para exibir o formulário de registro
app.get("/register", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../", "public/pages", "register-page.html")
  );
});

// Rota para tratar os dados do formulário de registro
app.post("/register", async (req: Request, res: Response) => {
  const { nome, sobrenome, usuario, email, senha } = req.body;

  try {
    await cadastrarUsuario(nome, sobrenome, usuario, email, senha); // Chamar a função de cadastro de usuário
    res.send("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).send(`Erro ao registrar usuário: ${error}`);
  }
});

// Rota para exibir o formulário de login
app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../', 'public/', 'index.html'));
});

// Rota para servir a página de lista de usuários após o login
app.get('/user-list', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/pages', 'user-list.html'));
});

// Rota para tratar os dados do formulário de login
app.post('/login', async (req: Request, res: Response) => {
    const {email, senha } = req.body;
    // console.log(req.body);
    
    console.log(email);
 
    try {
        // Verificar credenciais no banco de dados
        const usuarioAutenticado = await verificarCredenciais(email, senha);

        if (usuarioAutenticado) {
            // res.send('Login bem-sucedido!');
           
            res.redirect('/user-list');

        } else {
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login.');
    }
});

app.listen(PORT, () => {
  console.log(`⚡ Server is running on port ${PORT}`);
});
