import { PrismaClient, TimerInfo } from "@prisma/client";

class TimerInfoService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createTimerInfo(timerInfo: TimerInfo): Promise<TimerInfo> {
    const createdTimerInfo = await this.prisma.timerInfo.create({
      data: timerInfo,
    });
    return createdTimerInfo;
  }

  async getTimerInfoById(id: number): Promise<TimerInfo | null> {
    const timerInfo = await this.prisma.timerInfo.findUnique({
      where: { id },
    });
    return timerInfo;
  }

  async updateTimerInfo(
    id: number,
    timerInfoData: Partial<TimerInfo>
  ): Promise<TimerInfo | null> {
    const updatedTimerInfo = await this.prisma.timerInfo.update({
      where: { id },
      data: timerInfoData,
    });
    return updatedTimerInfo;
  }

  async deleteTimerInfo(id: number): Promise<TimerInfo | null> {
    const deletedTimerInfo = await this.prisma.timerInfo.delete({
      where: { id },
    });
    return deletedTimerInfo;
  }
}

export default TimerInfoService;
