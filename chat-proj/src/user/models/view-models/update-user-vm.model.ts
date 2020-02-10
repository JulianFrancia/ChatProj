import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserVm {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiPropertyOptional()
    @IsOptional()
    nick?: string;

    @ApiPropertyOptional()
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    lastName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    email?: string;

}
