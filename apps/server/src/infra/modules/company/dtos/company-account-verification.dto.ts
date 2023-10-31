import { IsString, IsNotEmpty, IsJWT, MinLength } from 'class-validator';

export class CompanyAccountVerificationDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
