import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../../auth.service';
import { ConfigurationService } from '../../../../shared/configuration/configuration.service';
import { ExtractJwt, VerifiedCallback, Strategy } from 'passport-jwt';
import { Configuration } from '../../../../shared/configuration/configuration.enum';
import { JwtPayload } from '../../jwt-payload';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly configurationService: ConfigurationService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // secretOrKey: configurationService.get(Configuration.JWT_KEY),
            secretOrKey: fs.readFileSync(path.join(__dirname, '../../../../../resources/keys/um-public.key'), 'utf-8'),
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this.authService.validatePayload(payload);

        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        return done(null, user, payload.iat);
    }
}
