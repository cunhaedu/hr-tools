// import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Length,
  IsEmail,
  IsObject,
  IsString,
  IsDefined,
  IsNotEmpty,
  IsMobilePhone,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

class CreateUserForCompanyDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class CreateCompanyDto {
  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsPostalCode('BR')
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @IsMobilePhone('pt-BR')
  phoneNumber: string;

  // @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUserForCompanyDto)
  responsible: CreateUserForCompanyDto;
}
