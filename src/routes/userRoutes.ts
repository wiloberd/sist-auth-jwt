import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import { listRoutes } from "../middleware/routes";

const router = Router();

// Rota para listar todas as rotas
router.get("/", listRoutes); 

router.get("/users", getAllUsers);

export default router;
