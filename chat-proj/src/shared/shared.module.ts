import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { HttpErrorFilter } from './filters/http-error.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy/jwt-strategy.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  providers: [
    ConfigurationService,
    MapperService,
    AuthService,
    HttpErrorFilter,
    ValidationPipe,
    LoggingInterceptor,
    AuthService,
    JwtStrategyService,
  ],
  exports: [
    ConfigurationService,
    MapperService,
    HttpErrorFilter,
    ValidationPipe,
    LoggingInterceptor,
    AuthService,
  ],
  imports: [UserModule],
})
export class SharedModule { }
