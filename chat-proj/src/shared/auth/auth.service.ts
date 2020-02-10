import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { SignOptions, sign, verify } from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { ConfigurationService } from '../../shared/configuration/configuration.service';
import { Configuration } from '../../shared/configuration/configuration.enum';
import { JwtPayload } from './jwt-payload';
import { User } from '../../user/models/user.model';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
        private readonly configurationService: ConfigurationService,
    ) {
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = configurationService.get(Configuration.JWT_KEY);
    }

    async signPayload(payload: JwtPayload, jwtCustomOptions?: SignOptions): Promise<string> {
        if (jwtCustomOptions) {
            return sign(payload, this.jwtKey, jwtCustomOptions);
        } else {
            return sign(payload, this.jwtKey, this.jwtOptions);
        }
    }

    async validatePayload(payload: JwtPayload): Promise<User> { // DocumentType<User>
        return this.userService.findOne({ username: payload.username.toLowerCase() });
    }

    async extractPayloadFromToken(token: string): Promise<JwtPayload> {
        const payload = verify(token, this.jwtKey, { ignoreExpiration: true });
        return JSON.parse(JSON.stringify(payload));
    }
}
