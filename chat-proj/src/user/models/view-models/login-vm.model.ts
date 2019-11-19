import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginVm {
    @IsNotEmpty()
    @ApiModelProperty()
    username: string;

    @IsNotEmpty()
    @ApiModelProperty()
    password: string;
}
