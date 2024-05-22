import { IsEmail, IsString, MinLength } from "class-validator"

export class SignupDto {
    @IsString()
    @MinLength(1)
    first_name: string

    @IsString()
    @MinLength(1)
    last_name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}