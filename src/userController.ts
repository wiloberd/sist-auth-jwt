// userController.ts

import { openDb } from "./database";

export async function cadastrarUsuario(
  nome: string,
  sobrenome: string,
  usuario: string,
  email: string,
  senha: string
): Promise<void> {
  try {
    const db = await openDb;
    await db.run(
      `INSERT INTO users (nome, sobrenome, usuario, email, senha) VALUES (?, ?, ?, ?, ?)`,
      [nome, sobrenome, usuario, email, senha]
    );
  } catch (error: unknown) {
    // 'error' é do tipo 'unknown'
    if (error instanceof Error) {
      throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
    } else {
      throw new Error(`Erro ao cadastrar usuário: ${String(error)}`);
    }
  }
}
