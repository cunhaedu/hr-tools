import { ApplicationError } from '@core/domain/errors/ApplicationError';

export class CompanyVerificationCodeInvalid extends ApplicationError {
  constructor() {
    super(`Provided verification code is invalid`);
  }
}
