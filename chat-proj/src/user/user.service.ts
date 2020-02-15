import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Inject,
  forwardRef,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

import { User } from './models/user.model';
import { BaseService } from '../shared/base.service';
import { ReturnModelType } from '@typegoose/typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { RegisterVm } from './models/view-models/register-vm.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { AuthService } from '../shared/auth/auth.service';
import { LoginVm } from './models/view-models/login-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { JwtPayload } from '../shared/auth/jwt-payload';
import { UserVm } from './models/view-models/user-vm.model';
import { ApiException } from '../shared/dto-models/api-exception.model';
import { ConfigurationService } from '../shared/configuration/configuration.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly mapperService: MapperService,
    @Inject(forwardRef(() => AuthService)) readonly authService: AuthService,
    private readonly configurationService: ConfigurationService,
  ) {
    super();
    this.model = userModel;
    this.mapper = mapperService.mapper;
  }

  async register(registerVm: RegisterVm): Promise<User> {
    const { username, password, email, firstName, lastName, nick, avatarUrl } = registerVm;

    const newUser = new this.model(); // DocumentType<User>
    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.nick = nick;
    newUser.avatarUrl = avatarUrl;
    newUser.email = email;

    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);

    try {
      const result = await this.create(newUser);
      return result[0].toJSON() as User;
    } catch (e) {
      // Mongo Error
      throw new InternalServerErrorException(e);
    }
  }

  async login(loginVm: LoginVm): Promise<LoginResponseVm> {
    const { username, password } = loginVm;

    const user = await this.findOne({ username });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload: JwtPayload = {
      username: user.username,
      roles: user.roles,
    };

    const token = await this.authService.signPayload(payload);
    const userVm = await this.map<UserVm>(user.toJSON());

    return {
      token,
      user: userVm,
    };
  }

  public async setAvatar(username: string, avatarUrl: string) {
    const user = await this.findOne({ username });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    this.update(user.id, { avatarUrl });
  }

  public async generateTokenForPwdReset(usr: string, expiresIn?: string) {
    const errorResp = new ApiException();
    let user = await this.findOne({ username: usr });
    if (!user) {
      user = await this.findOne({ email: usr });
    }

    if (!user) {
      errorResp.message = 'No existe el usuario';
      throw new HttpException(errorResp, 404);
    }

    const payload: JwtPayload = {
      username: user.username,
      roles: user.roles,
    };
    const token = await this.authService.signPayload(payload, expiresIn ? { expiresIn } : null);

    // const userVm = await this.map<UserVm>(user.toJSON());
    return {
      token,
      userFirstName: user.firstName,
      userEmail: user.email,
    };
  }

  public async changeUserPassword(username: string, password: string) {
    const errorResp = new ApiException();
    let user: User;

    try {
      user = await (await this.findOne({ username }));
      if (!user) {
        errorResp.message = 'No existe el usuario';
        throw new HttpException(errorResp, 400);
      }
    } catch (e) {
      // Mongo Error
      throw new InternalServerErrorException(e);
    }

    const salt = await genSalt(10);
    const passwordHashed = await hash(password, salt);

    try {
      const result = await this.update(user.id, { password: passwordHashed });
      return result;
    } catch (e) {
      // Mongo Error or Parse Error
      throw new InternalServerErrorException(e);
    }
  }

}
