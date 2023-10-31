import { CompanyRepository } from '@core/domain/repositories/company.repository';
import { EncoderProvider } from '@core/domain/providers/EncoderProvider';
import { TokenProvider } from '@core/domain/providers/TokenProvider';
import { MailProvider } from '@core/domain/providers/MailProvider';
import { Company } from '@core/domain/entities/Company';

import {
  CompanyNotFound,
  CompanyVerificationCodeInvalid,
  CompanyAlreadyVerified,
} from '../../errors';

type Input = {
  token: string;
  password: string;
};

export class VerifyCompanyAccount {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailProvider,
    private tokenProvider: TokenProvider,
    private encoderProvider: EncoderProvider,
  ) {}

  async execute({ token, password }: Input): Promise<void> {
    const isVerificationCodeValid = await this.isTokenValid(token);

    if (!isVerificationCodeValid) {
      throw new CompanyVerificationCodeInvalid();
    }

    const company = await this.companyRepository.findByVerificationCode(token);

    if (!company) {
      throw new CompanyNotFound();
    }

    if (company.isVerified) {
      throw new CompanyAlreadyVerified();
    }

    const hashedPassword = await this.encoderProvider.encode(password);

    await this.companyRepository.verifyCompanyAndActivateUser({
      companyId: company.id,
      responsible: {
        email: company.email,
        hashedPassword,
      },
    });

    await this.sendWelcomeEmail(company);
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      await this.tokenProvider.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async sendWelcomeEmail(company: Company): Promise<void> {
    const websiteUrl = `${process.env.CLIENT_BASE_URL}/dashboard`;
    const user = company.users[0];

    console.log(websiteUrl, user);

    // const html = await this.mailService.retrieveParsedEmailHtmlBasedOnTemplate(
    //   'welcome',
    //   { websiteUrl, userName: user.firstName },
    // );

    // await this.mailService.sendMail({
    //   recipients: [{ name: user.firstName, email: user.email }],
    //   subject: 'Boas Vindas',
    //   html,
    // });
  }
}
