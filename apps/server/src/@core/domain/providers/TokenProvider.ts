export type TokenProviderPayload = string | object | Buffer;

export type SignOptions = {
  expiresIn: string;
};

export interface TokenProvider {
  sign(
    info: TokenProviderPayload,
    secret: string,
    options: SignOptions,
  ): Promise<string>;
  verify(token: string, secret: string): Promise<TokenProviderPayload | Error>;
}
