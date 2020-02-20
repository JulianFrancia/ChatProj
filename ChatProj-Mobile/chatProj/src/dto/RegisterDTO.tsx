import { LoginDTO } from "./LoginDTO";

export interface RegisterDTO extends LoginDTO {
    email: string;
    firstName?: string;
    lastName?: string;
    nick?: string;
    avatarUrl?: string;
    groupsIds: string[];
    companyId: string;
}