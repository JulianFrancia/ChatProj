import { Controller, HttpStatus, Post, UsePipes, Res, Body, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UserVm } from './models/view-models/user-vm.model';
import { User } from './models/user.model';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { RegisterVm } from './models/view-models/register-vm.model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';

@Controller('user')
@ApiUseTags(User.modelName)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
        const { username, password } = registerVm;

        if (!username) {
            throw new BadRequestException('Username is required');
        }

        if (!password) {
            throw new BadRequestException('Password is required');
        }

        let exist;
        try {
            exist = await this.userService.findOne({ username });
        } catch (e) {
            throw new InternalServerErrorException(e);
        }

        if (exist) {
            throw new BadRequestException(`${username} exists`);
        }

        const newUser = await this.userService.register(registerVm);
        return this.userService.map<UserVm>(newUser);
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Login'))
    async login(@Body() loginVm: LoginVm): Promise<LoginResponseVm> {
        const fields = Object.keys(loginVm);

        fields.forEach(field => {
            if (!field) {
                throw new BadRequestException(`${field} is required`);
            }
        });

        return this.userService.login(loginVm);
    }

}
