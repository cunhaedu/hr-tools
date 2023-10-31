import { CompanyRepository } from '@core/domain/repositories/company.repository';
import { MailProvider } from '@core/domain/providers/MailProvider';

import { TokenProvider } from '@core/domain/providers/TokenProvider';

import { CompanyAlreadyRegistered } from '../../errors';

type Input = {
  name: string;
  cnpj: string;
  email: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  phoneNumber: string;
  responsible: {
    firstName: string;
    lastName: string;
  };
};

const VERIFICATION_CODE_EXPIRATION = '1d';

export class RegisterCompany {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailProvider,
    private tokenProvider: TokenProvider,
  ) {}

  async execute(input: Input): Promise<void> {
    const doesCompanyExist = !!(await this.companyRepository.findByEmailOrCnpj(
      input.email,
      input.cnpj,
    ));

    if (doesCompanyExist) {
      throw new CompanyAlreadyRegistered();
    }

    const verificationCode = await this.generateVerificationCode(input.email);

    await this.companyRepository.createWithAdministrator({
      ...input,
      verificationCode,
    });

    await this.sendEmailWithVerificationLink(input, verificationCode);
  }

  private generateVerificationCode(email: string): Promise<string> {
    return this.tokenProvider.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: VERIFICATION_CODE_EXPIRATION,
    });
  }

  private async sendEmailWithVerificationLink(
    input: Input,
    verificationCode: string,
  ): Promise<void> {
    const verificationUrl = `${process.env.CLIENT_BASE_URL}/account-verification/${verificationCode}`;

    const html = await this.mailService.retrieveParsedEmailHtmlBasedOnTemplate(
      'account-verification',
      { verificationUrl, userName: input.responsible.firstName },
    );

    await this.mailService.sendMail({
      recipients: [{ name: input.responsible.firstName, email: input.email }],
      subject: 'Verificação de cadastro',
      html,
    });
  }
}
