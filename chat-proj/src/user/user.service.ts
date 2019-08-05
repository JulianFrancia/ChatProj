import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/user.dto';
import { error } from 'util';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async getUser( userId: string ): Promise<User> {
        try {
            const user = await this.userModel.findById(userId);
            return user;
        } catch (error) {
            throw new BadRequestException('wrong id format', error);
        }
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        const user = new this.userModel(createUserDTO);
        return await user.save();
    }

    async deleteUser(userId: string): Promise<User> {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new BadRequestException('wrong id format', error);
        }
    }

    async updateUser(userId: string, createUserDto: CreateUserDTO): Promise<User> {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, createUserDto, {new: true});
            return updatedUser;
        } catch (error) {
            throw new BadRequestException('wrong id format', error);
        }
    }
}
