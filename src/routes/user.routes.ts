import { Router } from "express";
import { createUserHandler } from "../controllers";

const router = Router();

router.post("/", createUserHandler);

export default router;
