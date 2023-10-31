import { ApplicationError } from '@core/domain/errors/ApplicationError';

export class CompanyNotFound extends ApplicationError {
  constructor() {
    super(`Company not found`);
  }
}
