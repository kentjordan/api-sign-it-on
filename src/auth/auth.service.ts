import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import LoginDto from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly db: PrismaService,
        private readonly jwt: JwtService) { }

    async generateTokens(user_id: string) {

        const access_token = this.jwt.sign(
            { user_id },
            { secret: process.env.JWT_SECRET, expiresIn: "8h" });

        const refresh_token = this.jwt.sign({ access_token },
            { secret: process.env.JWT_SECRET, expiresIn: "7h" });

        return {
            access_token,
            refresh_token
        }

    }

    async login(credentials: LoginDto) {
        // TODO:
        // 1) Validate user with the database
        // 2) Return JWT

        const user = await this.db.user.findFirstOrThrow({
            select: {
                id: true,
                email: true,
                password: true,
            },
            where: {
                email: credentials.email,
            }
        });

        const isPasswordVerified = await argon.verify(user.password, credentials.password);

        if (isPasswordVerified) {
            return await this.generateTokens(user.id);
        }

        throw new UnauthorizedException("Invalid password.");

    }

    async signup(credentials: SignupDto) {
        // TODO: 
        // 1) Hash password
        // 2) Return JWT

        const hashedPassword = await argon.hash(credentials.password);

        const createdUser = await this.db.user.create({
            data: {
                ...credentials,
                password: hashedPassword
            }
        });

        return await this.generateTokens(createdUser.id);

    }

}
