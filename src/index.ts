// src/index.ts
import express from "express";
import pingRoutes from "./routes/ping.routes"
import userRoutes from "./routes/user.routes"

import cors from "cors";

const PORT = 8080;


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

app.use("/api/ping", pingRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});