import { PrismaClient, UserPassword } from "@prisma/client";

class UserPasswordService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUserPassword(userPassword: UserPassword): Promise<UserPassword> {
    const createdUserPassword = await this.prisma.userPassword.create({
      data: userPassword,
    });
    return createdUserPassword;
  }

  async getUserPasswordByUserId(userId: string): Promise<UserPassword | null> {
    const userPassword = await this.prisma.userPassword.findUnique({
      where: { userId },
    });
    return userPassword;
  }

  async updateUserPassword(
    userId: string,
    userPasswordData: Partial<UserPassword>
  ): Promise<UserPassword | null> {
    const updatedUserPassword = await this.prisma.userPassword.update({
      where: { userId },
      data: userPasswordData,
    });
    return updatedUserPassword;
  }

  async deleteUserPassword(userId: string): Promise<UserPassword | null> {
    const deletedUserPassword = await this.prisma.userPassword.delete({
      where: { userId },
    });
    return deletedUserPassword;
  }
}

export default UserPasswordService;
