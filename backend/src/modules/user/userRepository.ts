import { PrismaClient } from '@prisma/client';
import { user } from "@prisma/client";
import { TypePayloadUser } from "@modules/user/userModel";

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(user: Omit<User, 'user_id'>): Promise<User> {
    return await prisma.user.create({
      data: {
        project_id: user.project_id,
        role_id: user.role_id,
        username: user.username,
        password_hash: user.password_hash,
        created_by: user.created_by,
        updated_by: user.updated_by,
      },
    });
  }

  async getUserById(user_id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { user_id },
    });
  }

  async updateUser(user_id: string, user: Partial<Omit<User, 'user_id'>>): Promise<User | null> {
    return await prisma.user.update({
      where: { user_id },
      data: {
        project_id: user.project_id,
        role_id: user.role_id,
        username: user.username,
        password_hash: user.password_hash,
        updated_by: user.updated_by,
      },
    });
  }

  async deleteUser(user_id: string): Promise<void> {
    await prisma.user.delete({
      where: { user_id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}
