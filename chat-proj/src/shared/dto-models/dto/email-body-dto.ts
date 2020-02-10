import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailBodyDTO {

    @IsNotEmpty()
    @ApiProperty()
    template: string;

    @IsNotEmpty()
    @ApiProperty()
    data: any;

}
