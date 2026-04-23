// src/repositories/CsvUserRepository.ts
import { IUserRepository } from "./IUserRepository";
import { User } from "../models/User";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../../data/users.csv");
const HEADER = "id,name,lastname,email,phone";

export class CsvUserRepository implements IUserRepository {

  private async ensureFileExists() {
    try {
      await fs.access(FILE_PATH);
    } catch {
      // Crear directorio si no existe
      await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });

      // Crear archivo con header
      await fs.writeFile(FILE_PATH, HEADER + "\n", "utf-8");
    }
  }

  private async readFile(): Promise<User[]> {
    await this.ensureFileExists();

    const data = await fs.readFile(FILE_PATH, "utf-8");

    const lines = data.split("\n").filter(Boolean);

    // Si solo está el header
    if (lines.length <= 1) return [];

    return lines.slice(1).map(line => {
      const [id, name, lastname, email, phone] = line.split(",");
      return { id, name, lastname, email, phone };
    });
  }

  private async writeFile(users: User[]) {
    const content =
      HEADER + "\n" +
      users
        .map(u => `${u.id},${u.name},${u.lastname},${u.email},${u.phone}`)
        .join("\n");

    await fs.writeFile(FILE_PATH, content, "utf-8");
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