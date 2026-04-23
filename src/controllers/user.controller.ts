// src/routes/userRoutes.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { CsvUserRepository } from "../repositories/CsvUserRepository";
import { createUserDto } from "../dto/createUser.dto";
import { ZodError } from "zod";

const repo = new CsvUserRepository();
const concreteUserService = new UserService(repo);

export const createUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const parsedUser = await createUserDto.parse(req.body)
    const user = await concreteUserService.createUser(parsedUser);
    console.log("New user created: ", user)
    res.status(201).json(user);
  } catch (error) {
    // 🎯 Caso específico: error de validación
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.flatten()
      });
    }

    // 🎯 Caso genérico
    console.error(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
  
};