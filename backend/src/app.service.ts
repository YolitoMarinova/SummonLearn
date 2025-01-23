import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<string> {
    let user = await this.prisma.user.findFirst();

    return `Hello World! Hello ${user.name}`;
  }
}
