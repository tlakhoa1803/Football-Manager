import { ERROR_CODES } from '../const';

export default class InvalidResponse extends Error {
  static code = ERROR_CODES.INVALID_RESPONSE;

  constructor(message) {
    super(message || 'Invalid response.');
    this.code = ERROR_CODES.INVALID_RESPONSE;
  }
};
