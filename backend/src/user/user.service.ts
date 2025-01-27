import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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

    async create(user: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: user
        });
    }
}
