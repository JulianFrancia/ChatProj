import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly nick: string;

  @IsOptional()
  @IsString()
  readonly imageURL: string;

  @IsOptional()
  @IsDate()
  readonly creationDate: Date;
}
