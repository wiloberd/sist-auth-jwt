// index.ts

import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import { cadastrarUsuario } from "./userController"; // Importar a função de cadastro de usuário
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

app.listen(PORT, () => {
  console.log(`⚡ Server is running on port ${PORT}`);
});
