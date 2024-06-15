import { Request, Response } from "express";
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { openDb } from "../models/database";

const userSchema = z.object({
  nome: z.string(),
  sobrenome: z.string(),
  usuario: z.string(),
  email: z.string(),
  senha: z.string().min(5),
})

const loginSchema = z.object({
  usuario: z.string(),
  senha: z.string().min(5),
})

export const loginUser = async (req: Request, res: Response) => {
  const { usuario, senha } = loginSchema.parse(req.body);

  try {
    const db = await openDb;
    const query = "SELECT id, nome, sobrenome, usuario, email FROM users WHERE usuario =? AND senha =?";
    const user = await db.get(query, [usuario, senha]);
    
    if (user) {
      const token = jwt.sign({id: user.id }, process.env.JWT_TOKEN || 'secret', {
        expiresIn: '1h',
      });
      res.json({auth: true, token});
    } else{
      res.status(401).json({ error: "Usuário ou senha inválidos." });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const db = await openDb;
    const query = "SELECT id, nome, sobrenome, usuario, email FROM users";
    const users = await db.all(query);

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
};


export const getUserById = async (req: Request, res: Response) => {

  try {
    const db = await openDb;
    const query = "SELECT nome, sobrenome, usuario, email FROM users WHERE id =?";
    const user = await db.get(query, [req.params.id]);
    
    if (user) {
      console.log(user)
      res.status(200).json(user);
    }
    else {
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  }
    catch(error) {
      console.error("Erro ao listar usuário:", error);
      res.status(500).json({ error: "Erro ao listar usuário." });
    }
};


export const createUser = async (req: Request, res: Response) => {
  const { nome, sobrenome, usuario, email, senha } = userSchema.parse(req.body);
  console.log(req.body);

  try { 
    const db = await openDb;
    
    const result = await db.run(
      'INSERT INTO users (nome, sobrenome, usuario, email, senha) VALUES (?, ?, ?, ?, ?)', [nome, sobrenome, usuario, email, senha]
    );
    res.status(201).json({id: result.lastID, nome, sobrenome, usuario, email, senha})
        
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário." });
      }
};

export const updateUser = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {nome, sobrenome, usuario, email, senha} = userSchema.parse(req.body);

  try{
    const db = await openDb;
    const result = await db.run(
      'UPDATE users SET nome = ?, sobrenome = ?, usuario = ?, email = ?, senha = ? WHERE id = ?', [nome, sobrenome, usuario, email, senha, id]);
     if (result){
      res.status(200).json({id, nome, sobrenome, usuario, email, senha})

    }  else { 
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  }
    catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

export const deleteUserById = async (req: Request, res: Response) =>{
  const {id} = req.params;

  try{
      const db = await openDb;
      // const user = await db.run(
      //   'SELECT * FROM users WHERE id =?', [id]
      // );
      const result = await db.run(
        'DELETE FROM users WHERE id =?', [id]
      );
      if (result){
        res.status(200).json({id})
      } else {
        res.status(404).json({ error: "Usuário não encontrado." });
      }
    } catch (error) {
  }
}


export const getUserByUsername = async (req: Request, res: Response) => {
  console.log(req.body.usuario);

  try {
    const db = await openDb;
    const query =
      "SELECT nome, sobrenome, usuario, email FROM users WHERE usuario =?";
    const user = await db.get(query, [req.params.usuario]);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuário não encontradosss." });
    }
  } catch (error) {
    console.error("Erro ao listar usuário:", error);
    res.status(500).json({ error: "Erro ao listar usuário." });
  }
};