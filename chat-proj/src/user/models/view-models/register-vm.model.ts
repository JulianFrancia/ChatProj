import { LoginVm } from './login-vm.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class RegisterVm extends LoginVm {
    @ApiModelProperty()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @ApiModelPropertyOptional()
    firstName?: string;

    @IsOptional()
    @ApiModelPropertyOptional()
    lastName?: string;

    @IsOptional()
    @ApiModelPropertyOptional()
    nick?: string;

    @IsOptional()
    @ApiModelPropertyOptional()
    avatarUrl?: string;
}

