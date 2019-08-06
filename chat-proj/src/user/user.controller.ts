import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/create')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'user succesfully created',
            user,
        });
    }

    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            users,
        });
    }

    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') userId) {
        try {
            const user = await this.userService.getUser(userId);
            if (!user) { throw new NotFoundException('User does not exists'); }
            return res.status(HttpStatus.OK).json(user);
        } catch (httpException) {
            throw httpException;
        }
    }

    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userId') userId) {
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            if (!deletedUser) { throw new NotFoundException('User does not exists'); }
            return res.status(HttpStatus.OK).json({
                message: 'user deleted succesfully',
                deletedUser,
            });
        } catch (httpException) {
            throw httpException;
        }
    }

    @Put('/update')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Query('userId') userId) {
        try {
            const updatedUser = await this.userService.updateUser(userId, createUserDTO);
            if (!updatedUser) { throw new NotFoundException('User does not exists'); }
            return res.status(HttpStatus.OK).json({
                message: 'user updated succesfully',
                updatedUser,
            });
        } catch (httpException) {
            throw httpException;
        }
    }

}
