import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpErrorFilter } from './shared/filters/http-error.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/chatProj', {
      useNewUrlParser: true,
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

  constructor(private readonly configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(
      configurationService.get(Configuration.PORT),
    );
    AppModule.host = configurationService.get(Configuration.HOST);
    AppModule.isDev = configurationService.isDevelopment;
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
