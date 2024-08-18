import { ERROR_CODES } from '../const';

export default class UnknownError extends Error {
  static code = ERROR_CODES.UNKNOWN;

  constructor(message) {
    super(message || 'Unknown error.');
    this.code = ERROR_CODES.UNKNOWN;
  }
};

