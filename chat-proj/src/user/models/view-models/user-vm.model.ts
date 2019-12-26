import { BaseModel } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';
import { User } from '../user.model';

export class UserVm extends BaseModel<User> {
    @ApiProperty() username: string;
    @ApiPropertyOptional() nick: string;
    @ApiPropertyOptional() avatarUrl?: string;
    @ApiPropertyOptional() firstName?: string;
    @ApiPropertyOptional() lastName?: string;
    @ApiPropertyOptional() fullName?: string;
    @ApiPropertyOptional({ enum: EnumToArray(UserRole) }) role?: string;
}
