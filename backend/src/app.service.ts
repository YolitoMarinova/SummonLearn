import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  private readonly prisma = new PrismaClient();

  async getHello(): Promise<string> {
    let user = await this.prisma.user.findFirst();

    return `Hello World! Hello ${user.name}`;
  }
}
