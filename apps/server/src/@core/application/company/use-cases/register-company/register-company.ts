import { CompanyRepository } from '@core/domain/repositories/company.repository';
import { MailProvider } from '@core/domain/providers/MailProvider';

import { CompanyAlreadyRegistered } from '../../errors/company-already-registered';

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

export class RegisterCompany {
  constructor(
    private companyRepository: CompanyRepository,
    private mailService: MailProvider,
  ) {}

  async execute(input: Input): Promise<void> {
    const doesCompanyExist = !!(await this.companyRepository.findByEmailOrCnpj(
      input.email,
      input.cnpj,
    ));

    if (doesCompanyExist) {
      throw new CompanyAlreadyRegistered();
    }

    // generate verification code
    // send email

    await this.mailService.sendMail({
      recipients: [{ name: input.responsible.firstName, email: input.email }],
      subject: 'Verificação de cadastro',
      html: '<h1>Verifique seu cadastro</h1>',
      text: 'Verifique seu cadastro',
    });

    // await this.companyRepository.createWithAdministrator(input);
  }
}
