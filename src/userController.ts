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

export async function verificarCredenciais(email: string, senha: string): Promise<boolean> {
    try {
        const db = await openDb;
        const query = `
            SELECT * FROM users 
            WHERE (email = ?) 
            AND senha = ?
        `;
        const result = await db.get(query, [email, senha]);
 
        if (result) {
            return true; // Credenciais válidas
        } else {
            return false; // Credenciais inválidas
        }
    } catch (error) {
        console.error('Erro ao verificar credenciais:', error);
        throw new Error('Erro ao verificar credenciais.');
    }
}