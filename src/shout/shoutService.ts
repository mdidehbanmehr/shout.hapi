import { Prisma, PrismaClient, Shout } from "@prisma/client";
import { User } from "../auth/auth";
// import { Shout } from "./shout";
import Boom from "@hapi/boom";

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

  public async removeComment(
    commentId: number,
    userEmail: User["raw"]["email"]
  ) {
    const user = await this.prisma.user.findUnique({ where: { email: userEmail } });
    if(user?.role !== "Admin"){
      return  Boom.forbidden("Resource only available to admin");
    }else{
      try {
        return await this.prisma.shout.delete({where:{id: commentId}})
      } catch (error) {
        return Boom.notFound("comment with this id doens't exist")
        
      }
    }
  }
}
