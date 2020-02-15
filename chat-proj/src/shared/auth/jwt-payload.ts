import { UserRole } from 'src/user/models/user-role.enum';

export interface JwtPayload {
    username: string;
    roles: UserRole[];
    iat?: Date;
}
