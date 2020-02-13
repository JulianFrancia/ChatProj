import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { SignOptions, sign, verify } from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { ConfigurationService } from '../../shared/configuration/configuration.service';
import { Configuration } from '../../shared/configuration/configuration.enum';
import { JwtPayload } from './jwt-payload';
import { User } from '../../user/models/user.model';
// import { fs } from 'file-system';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    // private readonly jwtKey: string;
    private readonly jwtPrivateKey: string;
    private readonly jwtPublicKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
        private readonly configurationService: ConfigurationService,
    ) {
        // this.jwtOptions = { expiresIn: configurationService.get(Configuration.JWT_EXP_TIME) };
        this.jwtOptions = { expiresIn: configurationService.get(Configuration.JWT_EXP_TIME), algorithm: 'RS256' };
        // this.jwtKey = configurationService.get(Configuration.JWT_KEY);
        this.jwtPrivateKey = fs.readFileSync(path.join(__dirname, '../../../resources/keys/private.key'), 'utf-8');
        this.jwtPublicKey = fs.readFileSync(path.join(__dirname, '../../../resources/keys/public.key'), 'utf-8');
    }

    // async signPayload(payload: JwtPayload, jwtCustomOptions?: SignOptions): Promise<string> {
    //     if (jwtCustomOptions) {
    //         return sign(payload, this.jwtKey, jwtCustomOptions);
    //     } else {
    //         return sign(payload, this.jwtKey, this.jwtOptions);
    //     }
    // }
    async signPayload(payload: JwtPayload, jwtCustomOptions?: SignOptions): Promise<string> {
        if (jwtCustomOptions) {
            Object.defineProperty(jwtCustomOptions, 'algorithm', { value: 'RS256' });
            return sign(payload, this.jwtPrivateKey, jwtCustomOptions);
        } else {
            return sign(payload, this.jwtPrivateKey, this.jwtOptions);
        }
    }

    async validatePayload(payload: JwtPayload): Promise<User> { // DocumentType<User>
        return this.userService.findOne({ username: payload.username.toLowerCase() });
    }

    async extractPayloadFromToken(token: string): Promise<JwtPayload> {
        const payload = verify(token, this.jwtPublicKey, { ignoreExpiration: true });
        return JSON.parse(JSON.stringify(payload));
    }
}
