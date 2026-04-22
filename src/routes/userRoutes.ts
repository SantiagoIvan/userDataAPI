// src/routes/userRoutes.ts
import { Router } from "express";
import { UserService } from "../services/UserService";

export const userRoutes = (service: UserService) => {
  const router = Router();

  router.post("/users", async (req, res) => {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  });

  router.get("/users", async (_req, res) => {
    const users = await service.getUsers();
    res.json(users);
  });

  router.get("/users/:id", async (req, res) => {
    const user = await service.getUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  });

  return router;
};