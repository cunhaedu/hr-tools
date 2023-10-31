import { ApplicationError } from '@core/domain/errors/ApplicationError';

export class CompanyAlreadyVerified extends ApplicationError {
  constructor() {
    super(`Company is already verified`);
  }
}
