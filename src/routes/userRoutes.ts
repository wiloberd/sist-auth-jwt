import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUserById } from "../controllers/userController";
import { listRoutes } from "../middleware/routes";

const router = Router();

// Rota para listar todas as rotas
router.get("/", listRoutes); 

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

router.post("/users", createUser);
router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUserById);


export default router;
