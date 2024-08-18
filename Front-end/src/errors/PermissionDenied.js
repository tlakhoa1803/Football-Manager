import { ERROR_CODES } from '../const';

export default class PermissionDenied extends Error {
  static code = ERROR_CODES.PERMISSION_DENIED;

  constructor(message) {
    super(message || 'Permission Denied.');
    this.code = ERROR_CODES.PERMISSION_DENIED;
  }
};

