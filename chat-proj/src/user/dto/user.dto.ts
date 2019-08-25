import { IsString, IsDate } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nick: string;

  @IsString()
  readonly imageURL: string;

  @IsDate()
  readonly creationDate: Date;
}
