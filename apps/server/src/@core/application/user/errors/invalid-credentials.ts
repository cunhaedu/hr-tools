import { ApplicationError } from '@core/domain/errors/ApplicationError';

export class InvalidCredentials extends ApplicationError {
  constructor() {
    super(`Invalid credentials`);
  }
}
