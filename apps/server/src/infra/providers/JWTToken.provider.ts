import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import {
  SignOptions,
  TokenProvider,
  TokenProviderPayload,
} from '@core/domain/providers/TokenProvider';

@Injectable()
export class JwtTokenProvider implements TokenProvider {
  async sign(
    payload: TokenProviderPayload,
    secret: string,
    options: SignOptions,
  ): Promise<string> {
    return jwt.sign({ sub: payload }, secret, {
      expiresIn: options?.expiresIn ?? '1d',
    });
  }

  async verify(
    token: string,
    secret: string,
  ): Promise<TokenProviderPayload | Error> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid jwt token');
    }
  }
}
