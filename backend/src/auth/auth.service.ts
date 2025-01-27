import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const userHashPassword = await bcrypt.hashSync(user.password, salt);

        if (user && await bcrypt.compare(password, userHashPassword)) {
            const { password, ...result } = user;
            return result;
        }        
        return null;
    }
}
