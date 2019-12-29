import { UserVm } from './user-vm.model';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseVm {
    @ApiProperty()
    token: string;

    @ApiProperty()
    user: UserVm;
}
