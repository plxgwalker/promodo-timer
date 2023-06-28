import { PrismaClient, User } from "@prisma/client";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: data,
    });
    return user;
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user;
  }
}

export default UserService;
