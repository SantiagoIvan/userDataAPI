// src/services/UserService.ts
import { IUserRepository } from "../repositories/IUserRepository";
import { User } from "../models/User";
import { randomUUID } from "crypto";

export class UserService {
  constructor(private repo: IUserRepository) {}

  async getUsers() {
    return this.repo.getAll();
  }

  async getUser(id: string) {
    return this.repo.getById(id);
  }

  async createUser(data: Omit<User, "id">) {
    const user: User = {
      id: randomUUID(),
      ...data
    };

    return this.repo.create(user);
  }
}