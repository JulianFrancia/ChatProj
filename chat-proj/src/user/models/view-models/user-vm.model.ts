import { BaseModel } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from 'src/shared/utilities/enum-to-array';

export class UserVm extends BaseModel {
    @ApiModelProperty() username: string;
    @ApiModelPropertyOptional() nick: string;
    @ApiModelPropertyOptional() imageUrl?: UserRole;
    @ApiModelPropertyOptional() firstName?: string;
    @ApiModelPropertyOptional() lastName?: string;
    @ApiModelPropertyOptional() fullName?: string;
    @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) }) role?: string;
}
