// src/index.ts
import express from "express";
import { userRoutes } from "./routes/userRoutes";
import { CsvUserRepository } from "./repositories/CsvUserRepository";
import { UserService } from "./services/UserService";

const PORT = 8080;

const repo = new CsvUserRepository();
const service = new UserService(repo);

const app = express();
app.use(express.json());

app.use("/api", userRoutes(service));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});