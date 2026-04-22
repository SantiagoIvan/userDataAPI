// src/repositories/CsvUserRepository.ts
import { IUserRepository } from "./IUserRepository";
import { User } from "../models/User";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../../data/users.csv");

export class CsvUserRepository implements IUserRepository {

  private async readFile(): Promise<User[]> {
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      if (!data) return [];

      return data.split("\n").filter(Boolean).map(line => {
        const [id, name, lastname, email, phone] = line.split(",");
        return { id, name, lastname, email, phone };
      });

    } catch {
      return [];
    }
  }

  private async writeFile(users: User[]) {
    const content = users
      .map(u => `${u.id},${u.name},${u.lastname},${u.email},${u.phone}`)
      .join("\n");

    await fs.writeFile(FILE_PATH, content);
  }

  async getAll(): Promise<User[]> {
    return this.readFile();
  }

  async getById(id: string): Promise<User | null> {
    const users = await this.readFile();
    return users.find(u => u.id === id) || null;
  }

  async create(user: User): Promise<User> {
    const users = await this.readFile();
    users.push(user);
    await this.writeFile(users);
    return user;
  }
}