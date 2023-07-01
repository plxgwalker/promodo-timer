import { PrismaClient, TimerSettings } from "@prisma/client";

class TimerSettingsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createTimerSettings(
    timerSettings: TimerSettings
  ): Promise<TimerSettings> {
    const createdTimerSettings = await this.prisma.timerSettings.create({
      data: timerSettings,
    });
    return createdTimerSettings;
  }

  async getTimerSettingsById(id: number): Promise<TimerSettings | null> {
    const timerSettings = await this.prisma.timerSettings.findUnique({
      where: { id },
    });
    return timerSettings;
  }

  async updateTimerSettings(
    id: number,
    timerSettingsData: Partial<TimerSettings>
  ): Promise<TimerSettings | null> {
    const updatedTimerSettings = await this.prisma.timerSettings.update({
      where: { id },
      data: timerSettingsData,
    });
    return updatedTimerSettings;
  }

  async deleteTimerSettings(id: number): Promise<TimerSettings | null> {
    const deletedTimerSettings = await this.prisma.timerSettings.delete({
      where: { id },
    });
    return deletedTimerSettings;
  }
}

export default TimerSettingsService;
