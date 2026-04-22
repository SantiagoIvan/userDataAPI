// src/repositories/IUserRepository.ts
import { User } from "../models/User";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
}