import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }        
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(dto: RegisterDto) {
        const {name, email, username, password } = dto;

        const saltRounds = 10;
        //const salt = await bcrypt.genSaltSync(saltRounds);
        const hashPassword = await bcrypt.hashSync(password, saltRounds);
        return this.userService.create({
                name,
                email,
                username,
                password: hashPassword
        });
    }
}
