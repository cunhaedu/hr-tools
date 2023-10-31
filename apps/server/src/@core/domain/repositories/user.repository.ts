import { User } from '../entities/User';

export abstract class UserRepository {
  abstract findByEmailWithPermissions(email: string): Promise<User | null>;
}
