import {
    Controller,
    HttpStatus,
    Post,
    UsePipes,
    Res,
    Body,
    BadRequestException,
    InternalServerErrorException,
    UseInterceptors,
    Get,
    Param,
    UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserVm } from './models/view-models/user-vm.model';
import { User } from './models/user.model';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { RegisterVm } from './models/view-models/register-vm.model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('user')
@ApiTags(User.modelName)
export class UserController {

    SERVER_URL = 'localhost:3000';

    constructor(private readonly userService: UserService) { }

    @Post('register')
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(@Body() registerVm: RegisterVm): Promise<UserVm> {
        const { username } = registerVm;

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

    @Post(':username/avatar')
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'UploadAvatar'))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './upload/avatars',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        },
    ),
    )
    uploadAvatar(@Param('username') username, @UploadedFile() file) {
        this.userService.setAvatar(username, `${this.SERVER_URL}/${file.path}`);
    }

    @Get('avatars/:fileId')
    @ApiResponse({ status: HttpStatus.OK }) //  type: File
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'ServeAvatar'))
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'upload/avatars' });
    }

}
