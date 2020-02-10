import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EmailBodyDTO } from './email-body-dto';

export class EmailDTO {

    @IsNotEmpty()
    @ApiProperty()
    to: string;

    @ApiProperty()
    @IsOptional()
    cc?: string;

    @IsNotEmpty()
    @ApiProperty()
    subject: string;

    @IsNotEmpty()
    @ApiProperty()
    body: EmailBodyDTO;

}
