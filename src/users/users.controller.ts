import { Controller, Get, Param, ParseUUIDPipe, UseFilters } from "@nestjs/common";
import UsersService from "./users.service";
import PrismaExceptionFilter from "src/filters/PrismaException.filter";

@Controller('users')
@UseFilters(PrismaExceptionFilter)
export default class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.getUserById(id);
    }
}