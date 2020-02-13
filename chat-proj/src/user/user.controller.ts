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
    Logger,
    UseGuards,
    Headers,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserVm } from './models/view-models/user-vm.model';
import { User } from './models/user.model';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { RegisterVm } from './models/view-models/register-vm.model';
import { ApiException } from '../shared/dto-models/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { MailService } from '../shared/services/mail.service';
import { EmailDTO } from '../shared/dto-models/dto/email-DTO';
import { EmailBodyDTO } from '../shared/dto-models/dto/email-body-dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../shared/auth/auth.service';
import { UpdateUserVm } from './models/view-models/update-user-vm.model';
import { Configuration } from '../shared/configuration/configuration.enum';

@Controller('user')
@ApiTags(User.modelName)
export class UserController {

    SERVER_URL: string;
    WEB_APP_URL: string;
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
        private readonly emailService: MailService,
        ) {
            this.SERVER_URL = this.configurationService.get(Configuration.HOST) + ':' + this.configurationService.get(Configuration.PORT);
            this.WEB_APP_URL = this.configurationService.get(Configuration.WEB_URL);
        }

    @Post('register')
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(
        @Body() registerVm: RegisterVm,
        @Res() res,
        ): Promise<UserVm> {
        const errorResp = new ApiException();
        const { username, email, firstName } = registerVm;

        let existUsername;
        let existEmail;
        try {
            existUsername = await this.userService.findOne({ username });
            existEmail = await this.userService.findOne({ email });
        } catch (e) {
            // Mongo Error
            throw new InternalServerErrorException(e);
        }

        if (existUsername || existEmail) {
            errorResp.message = existUsername ? `El usuario ${username} ya existe. ` : '';
            errorResp.message = errorResp.message + (existEmail ? `El email ${email} se encuentra en uso. ` : '');
            res.status(400).send(errorResp);
            return;
        }

        const newUser = await this.userService.register(registerVm);
        res.send(this.userService.map<UserVm>(newUser));

        try {
            const infoEmail = new EmailDTO();
            infoEmail.to = email;
            infoEmail.subject = 'Bienvenido a BeePMP';
            infoEmail.body = new EmailBodyDTO();
            infoEmail.body.template = 'register-welcome.template.html';
            infoEmail.body.data = { NOMBRE: firstName, EMAIL: email };

            this.emailService.sendTemplateEmail(infoEmail);
        } catch (err) { this.logger.error(err); }
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

    @Post('/forgotPwd')
    @ApiResponse({ status: HttpStatus.OK, type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'ForgotPassword'))
    async forgotPassword(@Body() bdy, @Res() res): Promise<string> {
        res.send('Si el usuario o email es correcto, recibirá un mail a su casilla con un link para restaurar su contraseña. \r\n'
            + 'Si está seguro de que el usuario que está ingresando es correcto, y aún así no le llega el mail, intente nuevamente más tarde.');

        const userTkn = await this.userService.generateTokenForPwdReset(bdy.user, '3h');

        try {
            const infoEmail = new EmailDTO();
            infoEmail.to = userTkn.userEmail;
            infoEmail.subject = 'Llegó la ayuda!!';
            infoEmail.body = new EmailBodyDTO();
            infoEmail.body.template = 'forgot-password.template.html';
            infoEmail.body.data = { NOMBRE: userTkn.userFirstName, URL: this.WEB_APP_URL + '/resetpwd?token=' + userTkn.token };

            this.emailService.sendTemplateEmail(infoEmail);
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException(err);
        }
        return;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/resetPwdValidation')
    @ApiResponse({ status: HttpStatus.OK, type: String })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'ResetPasswordValidation'))
    async resetPasswordValidation(
        @Res() res,
        @Headers('authorization') bearerToken,
    ) {
        const token = bearerToken.split(' ')[1];
        const payload = await this.authService.extractPayloadFromToken(token);

        /* AGREGAR TOKEN A LA BLACKLIST (? */

        const tokenForResetPwd = await this.userService.generateTokenForPwdReset(payload.username);
        return res.send(tokenForResetPwd.token);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/resetPwd')
    @ApiResponse({ status: HttpStatus.OK, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'ResetPassword'))
    async resetPassword(
        @Res() res,
        @Headers('authorization') bearerToken,
        @Body() bdy,
    ): Promise<UserVm> {
        const token = bearerToken.split(' ')[1];
        const payload = await this.authService.extractPayloadFromToken(token);

        /* AGREGAR TOKEN A LA BLACKLIST (? */

        const result = await this.userService.changeUserPassword(payload.username, bdy.password);
        res.send(this.userService.map<UserVm>(result.toJSON() as User));

        try {
            const infoEmail = new EmailDTO();
            infoEmail.to = result.email;
            infoEmail.subject = 'Cambio de Contraseña';
            infoEmail.body = new EmailBodyDTO();
            infoEmail.body.template = 'reset-password-succesfully.template.html';
            infoEmail.body.data = { NOMBRE: result.firstName };

            this.emailService.sendTemplateEmail(infoEmail);
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException(err);
        }

        return;

    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @ApiResponse({ status: HttpStatus.CREATED, type: UserVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'UpdateUser'))
    async updateUser(
        @Res() res,
        @Body() updateVm: UpdateUserVm,
    ): Promise<UserVm> {
        try {
            const parcialUpdate = new User();
            // parcialUpdate.username = updateVm.username;
            parcialUpdate.firstName = updateVm.firstName;
            parcialUpdate.lastName = updateVm.lastName;
            parcialUpdate.nick = updateVm.nick;
            // parcialUpdate.avatarUrl = updateVm.avatarUrl;
            parcialUpdate.email = updateVm.email;
            const result = await this.userService.update(updateVm.id, parcialUpdate);
            return res.send(result);
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException(err);
        }
    }

}
