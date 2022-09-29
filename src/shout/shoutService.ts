import { Prisma, PrismaClient } from "@prisma/client";
import { Shout } from "./shout";

export class ShoutService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(theDto: Prisma.ShoutCreateInput): Promise<Shout> {
    return await this.prisma.shout.create({
      data: { ...theDto },
    });
  }

  public async getAll(): Promise<Shout[]> {
    return await this.prisma.shout.findMany({
      orderBy: [{ updatedAt: "asc" }],
    });
  }
}
