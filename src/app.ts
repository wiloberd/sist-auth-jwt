import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Use as rotas de usuário
app.use("/", userRoutes);

export default app;
