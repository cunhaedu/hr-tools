import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { EncoderProvider } from '@core/domain/providers/EncoderProvider';

const DEFAULT_SALTS = 8;

@Injectable()
export class BcryptEncoderProvider implements EncoderProvider {
  async encode(plain: string, salts = DEFAULT_SALTS): Promise<string> {
    return bcrypt.hash(plain, salts);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
