export interface UsuarioDTO {
    username: string,
    email: string;
    nick?: string;
    avatarUrl?: string;
    firstName?: string;
    lastName?: string;
    fullName: string;
    roles: any[];
}