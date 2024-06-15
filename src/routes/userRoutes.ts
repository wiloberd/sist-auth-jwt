import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUserById, loginUser } from "../controllers/userController";
import { listRoutes } from "../middleware/routes";
import { authenticate } from "../middleware/auth";

const router = Router();
 
// Rota para listar todas as rotas
router.get("/", listRoutes); 
 
router.post("/login", loginUser);
router.get("/users", authenticate, getAllUsers);
router.get("/users/:id", authenticate, getUserById);

router.post("/users", createUser);
router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUserById);


export default router;
