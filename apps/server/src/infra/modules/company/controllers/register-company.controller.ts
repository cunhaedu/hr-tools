import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { RegisterCompany } from '@core/application/company/use-cases/register-company/register-company';

@Controller('companies')
export class RegisterCompanyController {
  constructor(private registerCompany: RegisterCompany) {}

  @Post()
  async create(@Body() body: CreateCompanyDto) {
    await this.registerCompany.execute(body);
  }
}
