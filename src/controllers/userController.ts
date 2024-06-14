import { Request, Response } from "express";
import { openDb } from "../database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const db = await openDb;
    const query = "SELECT nome, sobrenome, usuario, email FROM users";
    const users = await db.all(query);

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
};
