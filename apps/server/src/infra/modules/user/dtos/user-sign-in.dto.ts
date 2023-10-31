import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserSignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
