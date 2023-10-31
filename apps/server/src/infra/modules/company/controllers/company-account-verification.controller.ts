import { Body, Controller, Post } from '@nestjs/common';

import { VerifyCompanyAccount } from '@core/application/company/use-cases/verify-company-account/verify-company-account';
import { CompanyAccountVerificationDto } from '../dtos/company-account-verification.dto';

@Controller('companies')
export class CompanyAccountVerificationController {
  constructor(private verifyCompanyAccount: VerifyCompanyAccount) {}

  @Post('/account-verification')
  async create(@Body() body: CompanyAccountVerificationDto) {
    await this.verifyCompanyAccount.execute(body);
  }
}
