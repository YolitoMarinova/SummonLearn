import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        //TODO: Move this in the register method
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const userHashPassword = await bcrypt.hashSync(user.password, salt);

        if (user && await bcrypt.compare(password, userHashPassword)) {
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
}
