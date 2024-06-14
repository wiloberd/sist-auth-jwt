// index.ts
import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import { cadastrarUsuario, verificarCredenciais } from "./userController"; // Importar a função de cadastro de usuário
import { openDb } from "./database";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear o corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

// Middleware para servir arquivos estáticos
app.use(express.static("public"));

// Rota para exibir o formulário de cadastro de usuario
app.get("/register", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../", "public/pages", "register-page.html")
  );
});

// Rota para tratar os dados do formulário de cadastro
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

// Rota para servir a página de lista de usuários após o login
app.get('/usuarios', async (req: Request, res: Response) => {
    try {
      const authenticatedUser = req.query.user as string;

      const db = await openDb;
      const query = `SELECT usuario, email FROM users`;
      const users = await db.all(query);

      // Separar o usuário autenticado dos outros usuários
      const authenticatedUserData = users.find(
        (user) => user.email === authenticatedUser
      );
      const usuarioAuth = authenticatedUserData.usuario;

      res.render("user-list", { users, usuarioAuth });
     
    } catch (error) {
        console.error('Erro ao obter lista de usuários:', error);
        res.status(500).send('Erro ao obter lista de usuários.');
    }
});

// Rota para exibir o formulário de login
app.get('', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../', 'public/', 'index.html'));
});

// Rota para tratar os dados do formulário de login e autenticar o usuario 
app.post('', async (req: Request, res: Response) => {
    const {email, senha } = req.body;
    
    try {
        // Verificar credenciais no banco de dados
        const usuarioAutenticado = await verificarCredenciais(email, senha);

        if (usuarioAutenticado) {
            // res.send('Login bem-sucedido!');
            res.redirect(`/usuarios?user=${email}`);
        } else {
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login.');
    }
}); 
   
// Rota para logout
app.get('/logout', (req, res) => {
    // Redirecionar para a página de login ou página inicial
    res.redirect('/'); // Exemplo: redireciona para a página de login
});
app.get('/login', (req, res) => {
    // Redirecionar para a página de login ou página inicial
    res.redirect('/'); // Exemplo: redireciona para a página de login
});

app.listen(PORT, () => {
  console.log(`⚡ Server is running on port ${PORT}`);
});
