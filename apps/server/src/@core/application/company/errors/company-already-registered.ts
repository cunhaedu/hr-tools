import { ApplicationError } from '@core/domain/errors/ApplicationError';

export class CompanyAlreadyRegistered extends ApplicationError {
  constructor() {
    super(`Company with provided email or cnpj is already registered`);
  }
}
