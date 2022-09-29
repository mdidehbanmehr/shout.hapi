import { User } from "./auth";
import * as Hapi from "@hapi/hapi";
import { PrismaClient } from "@prisma/client";

export class authService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getUser(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ): Promise<User> {
    return request.state.auth;
  }

  public async registerUser(user: User["raw"]){
    await this.prisma.user.upsert({
      create: { email: user.email },
      update: { email: user.email },
      where: {id: 1}
    });
  }
}
