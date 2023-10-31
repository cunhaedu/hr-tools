import { Company } from '../entities/Company';

export interface CreateCompanyData {
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
  verificationCode: string;
  responsible: {
    firstName: string;
    lastName: string;
  };
}

export interface VerifyCompanyAndActivateUserData {
  companyId: string;
  responsible: {
    email: string;
    hashedPassword: string;
  };
}

export abstract class CompanyRepository {
  abstract createWithAdministrator(data: CreateCompanyData): Promise<void>;

  abstract findById(id: string): Promise<Company | null>;

  abstract findByVerificationCode(token: string): Promise<Company | null>;

  abstract findByEmailOrCnpj(
    email: string,
    cnpj: string,
  ): Promise<Company | null>;

  abstract verifyCompanyAndActivateUser(
    data: VerifyCompanyAndActivateUserData,
  ): Promise<void>;
}
