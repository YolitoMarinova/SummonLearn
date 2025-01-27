import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                username: username,
            }
        });
    }
}
