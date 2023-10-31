import { ApplicationError } from '@core/domain/errors/ApplicationError';

export class UserNotFound extends ApplicationError {
  constructor() {
    super(`User not found`);
  }
}
