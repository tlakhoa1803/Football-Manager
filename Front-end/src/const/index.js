export { default as ERROR_CODES } from './errorCodes';
export { default as PATHS } from './paths';
export { default as TIME_ZONES } from './timezones';


export const FLASH_TYPES = {
  INFO: 'info',
  ERROR: 'error'
};

export const FILTER_TYPES = {
  INCLUDE: 'include',
  EXCLUDE: 'exclude',
  CONTAIN: 'contain',
  REGEX: 'regex',
  GREATER_THAN: 'greater_than',
  GREATER_THAN_OR_EQUAL_TO: 'greater_than_or_equal_to',
  LESS_THAN: 'less_than',
  LESS_THAN_OR_EQUAL_TO: 'less_than_or_equal_to',
  IS_EQUAL_TO: 'is_equal_to',
};

export const entries = [
  {
    text: '10 rows',
    value: 10,
  },
  {
    text: '25 rows',
    value: 25,
  },
  {
    text: '50 rows',
    value: 50,
  },
  {
    text: '100 rows',
    value: 100,
  },
];

export const PLATFORM = {
  ANDROID: 'Android',
  IOS: 'iOS',
}

export const MIN_DATE = '2015-01-01';

export const FLASH_TIMEOUT = 5000;

export const DISPLAY_DATE_FORMAT = 'DD/MM/YYYY';
export const DISPLAY_DATE_CALENDAR_FORMAT = 'MMM DD, YYYY'
export const DURATION_FORMAT = 'HH:mm:ss.SSS';
export const HOUR_FORMAT = "HH:mm";
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DISPLAY_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';

export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const MESSAGE_INFO = "info";
export const MESSAGE_ERROR = "error";
export const MESSAGE_SUCCESS = "success";