export abstract class EncoderProvider {
  /**
   * Encodes a plain string using salts.
   *
   * @param {string} plain - The plain string to encode.
   * @param {number} [salts=8] - The number of salts to use. Default value is 10.
   * @return {Promise<string>} A promise that resolves to the encoded string.
   */
  abstract encode(plain: string, salts?: number): Promise<string>;

  abstract compare(plain: string, hashed: string): Promise<boolean>;
}
