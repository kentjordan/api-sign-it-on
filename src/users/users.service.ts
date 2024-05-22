import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export default class UsersService {

    constructor(private readonly db: PrismaService) { }

    async getUserById(id: string) {
        return await this.db.user.findUniqueOrThrow({
            select: {
                id: true,
                first_name: true,
                last_name: true
            },
            where: {
                id
            }
        });
    }

}