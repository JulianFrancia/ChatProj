import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { HttpErrorFilter } from './filters/http-error.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { BaseService } from './base.service';

@Global()
@Module({
  providers: [
    ConfigurationService,
    MapperService,
    HttpErrorFilter,
    ValidationPipe,
    LoggingInterceptor,
  ],
  exports: [
    ConfigurationService,
    MapperService,
    HttpErrorFilter,
    ValidationPipe,
    LoggingInterceptor,
  ],
})
export class SharedModule { }
