// src/index.ts
import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { CsvUserRepository } from "./repositories/CsvUserRepository";
import { UserService } from "./services/UserService";
import cors from "cors";

const PORT = 8080;

const repo = new CsvUserRepository();
const service = new UserService(repo);

const app = express();
app.use(cors()) // Para que sea mas exacto, habilitarlo solo con el dominio del front y los metodos correspondientes

/*
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);
*/

app.use(express.json());

app.use("/api", userRoutes(service));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});