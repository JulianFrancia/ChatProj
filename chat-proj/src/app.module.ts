import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpErrorFilter } from './shared/filters/http-error.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import {
  SharedModule,
  //ValidationPipe,
  //HttpErrorFilter,
  //LoggingInterceptor,
} from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/chatProj', {
      useNewUrlParse: true,
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  static host: string;
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(
      _configurationService.get(Configuration.PORT),
    );
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number =
      typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) {
      return param;
    } else if (portNumber >= 0) {
      return portNumber;
    }
  }
}
