import { UserRepository } from '@core/domain/repositories/user.repository';
import { EncoderProvider } from '@core/domain/providers/EncoderProvider';
import { TokenProvider } from '@core/domain/providers/TokenProvider';

import { InvalidCredentials } from '../../errors';

type Input = {
  email: string;
  password: string;
};

type Output = {
  id: string;
  name: string;
  token: string;
};

export class UserSignIn {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: TokenProvider,
    private encoderProvider: EncoderProvider,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const passwordMatch = await this.encoderProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new InvalidCredentials();
    }

    const payload = {
      id: user.id,
      name: user.firstName,
      email: user.email,
      company: {
        id: user.company.id,
        name: user.company.name,
      },
    };

    const token = await this.tokenProvider.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '60' },
    );

    return {
      id: user.id,
      name: user.firstName,
      token,
    };
  }
}
