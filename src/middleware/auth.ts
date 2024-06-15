import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN || "secret");

    //@ts-ignore
    req.id = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Token is not valid" });
  }
}
