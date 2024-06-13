import { Database as driver } from "sqlite3";
import { open } from "sqlite";

const filename = "database.sqlite";
const databaseConnectionPromise = open({ driver, filename });

void (async function () {
  const connection = await databaseConnectionPromise;

  await connection.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      sobrenome TEXT NOT NULL,
      usuario TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    ) 
  `);
//   try {
//     await connection.exec(`
//         INSERT INTO users (nome, sobrenome, usuario, email, senha) 
//         VALUES ('Nome', 'Sobrenome', 'admins', 'wiloberd11@gmail.com', 'admin')
//     `);
//   } catch (error) {
//     console.log("Erro ao inserir usuário:" + `${error}`);
//   }
})();

export  {databaseConnectionPromise as openDb};
