import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './models/user.model';
import { BaseService } from '../shared/base.service';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { RegisterVm } from './models/view-models/register-vm.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { AuthService } from '../shared/auth/auth.service';
import { LoginVm } from './models/view-models/login-vm.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { JwtPayload } from '../shared/auth/jwt-payload';
import { UserVm } from './models/view-models/user-vm.model';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
    private readonly mapperService: MapperService,
    @Inject(forwardRef(() => AuthService)) readonly authService: AuthService,
  ) {
    super();
    this.model = userModel;
    this.mapper = mapperService.mapper;
  }

  async register(registerVm: RegisterVm): Promise<User> {
    const { username, password, email, firstName, lastName, nick, avatarUrl } = registerVm;

    const newUser = new this.model(); // InstanceType<User>
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
      return result.toJSON() as User;
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
      role: user.role,
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

}
