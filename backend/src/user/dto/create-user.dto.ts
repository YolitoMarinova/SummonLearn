import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
     @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    //TODO: Add a custom validation decorator to check if the password contains at least one uppercase letter, 
    // one lowercase letter, one number, and one special character.
    //NOTE: Should we constraint DB too for the lenght?
    password: string;
}