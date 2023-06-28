import { PrismaClient, Timer } from "@prisma/client";

class TimerService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createTimer(timer: Timer): Promise<Timer> {
    const newTimer = await this.prisma.timer.create({
      data: timer,
    });
    return newTimer;
  }

  async getTimer(id: number): Promise<Timer | null> {
    const timer = await this.prisma.timer.findUnique({
      where: { id },
    });
    return timer;
  }

  async updateTimer(id: number, data: Partial<Timer>): Promise<Timer | null> {
    const timer = await this.prisma.timer.update({
      where: { id },
      data: data,
    });
    return timer;
  }

  async deleteTimer(id: number): Promise<Timer | null> {
    const timer = await this.prisma.timer.delete({
      where: { id },
    });
    return timer;
  }
}

export default TimerService;
