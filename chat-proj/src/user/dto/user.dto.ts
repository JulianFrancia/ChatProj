export class CreateUserDTO {
    readonly name: string;
    readonly password: string;
    readonly nick: string;
    readonly imageURL: string;
    readonly creationDate: Date;
}
