import axios from 'axios';
import * as errors from '../errors';


/**
 * Adds commas to a number string for better readability.
 * @param {string | number} str_ - The number string to add commas to.
 * @param {string} [comma_] - The character to be used as the comma separator. Default is ','.
 * @returns {string} Returns the number string with commas added.
 */
export const addCommas = (str_, comma_) => {
  if (!str_) return 0;
  let str = str_.toString();

  while (str[0] === '0') str = str.substring(1, str.length);

  const comma = comma_ || ',';

  let s = str;
  let tail = '';

  const dot = str.indexOf(comma === ',' ? '.' : ',');

  if ((dot >= 0) && (dot !== str.length - 1)) {
    tail = str.substring(dot + 1, str.length);

    if (comma === ',') {
      tail = `.${tail}`;
    } else {
      tail = `,${tail}`;
    }

    s = str.substring(0, dot);
  }

  let signed = false;
  if (s[0] === '-') {
    signed = true;
  }

  s = s.replace(/\D/g, '');

  if (s.length < 4) return `${signed ? '-' : ''}${s}${tail}`;

  let temp = '';
  let n = 0;

  for (let i = s.length - 1; i >= 0; i -= 1) {
    temp = `${s[i]}${temp}`;
    n += 1;
    if ((n % 3 === 0) && (i > 0)) temp = `${comma}${temp}`;
  }
  return `${signed ? '-' : ''}${temp}${tail}`;
};


/**
 * Removes commas from a number string and parses it into a floating-point number.
 * @param {string | number} str_ - The number string with commas to be removed.
 * @param {string} [comma_] - The character used as the comma separator. Default is ','.
 * @returns {number} Returns the number after removing commas and parsing into a float.
 */
export const removeCommas = (str_, comma_) => {
  if (!str_) return 0;
  let str = str_.toString();

  const comma = comma_ || ',';

  str = str.replaceAll(comma, '');
  if (comma === '.') {
    str = str.replace(',', '.');
  }

  return parseFloat(str, 10);
};

/**
 * Processes a request using Axios library.
 * @param {Object} ep - The endpoint configuration object.
 * @param {string} ep.method - The HTTP request method (e.g., 'GET', 'POST').
 * @param {string} ep.url - The URL for the HTTP request.
 * @param {string} ep.baseURL - The base URL for the HTTP request (optional).
 * @param {Object} ep.headers - The headers for the HTTP request (optional).
 * @param {Object} config - Additional configuration for the Axios request (optional).
 * @returns {Promise} A Promise that resolves with the Axios response.
 */
export const processRequest = (ep, config) => {
  const { headers, method, url, baseURL } = ep;

  return axios({
    headers: headers ?? { 'Content-Type': 'application/json' },
    baseURL,
    method,
    url,
    ...config,
  });
};

export const processForm = (ep) => {
  const { headers, method, url, baseURL } = ep;
  return axios.get(baseURL + url, { headers: headers })
}

/**
 * Processes a successful response from an API request.
 * @param {Object} res - The response object from the API request (optional).
 * @param {Object} res.data - The data object within the response (optional).
 * @param {any} res.data.data - The actual data returned from the API (optional).
 * @returns {any} The data extracted from the response.
 * @throws {InvalidResponse} If the response does not contain valid data.
 */
export const processSuccessResponse = (res = {}) => {
  const { InvalidResponse } = errors;

  const data = res?.data?.data;

  if (!data) {
    throw new InvalidResponse();
  }

  return data;
};

/**
 * Processes an error response from an API request.
 * @param {Object} res - The response object from the API request (optional).
 * @param {Object} res.data - The data object within the response (optional).
 * @param {string} res.data.code - The error code returned from the API (optional).
 * @param {string} res.data.message - The error message returned from the API (optional).
 * @throws {InvalidResponse} If the response object is not provided.
 * @throws {CustomError} If the error code corresponds to a known error.
 * @throws {UnknownError} If the error code is not recognized or no error message is provided.
 */
export const processErrorResponse = (res = {}) => {
  const { InvalidResponse, UnknownError } = errors;

  if (!res) {
    throw new InvalidResponse();
  }

  const { code, message } = res.data;

  Object.keys(errors).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(errors, key)) {
      if (code === errors[key].code) {
        throw new errors[key](message);
      }
    }
  });

  throw new UnknownError(message || 'Unknown Error');
};

/**
 * Checks if the user has all the required permissions.
 * @param {string[]} requiredPermissions - An array of required permissions.
 * @returns {boolean} Returns true if the user has all required permissions, otherwise false.
 */
export const hasPermission = (requiredPermissions) => {
  return requiredPermissions.every((permission) => true);
};

/**
 * Represents an attribute.
 * @typedef {Object} Attribute
 * @property {string} name - The name of the attribute.
 * @property {string} type - The type of the attribute.
 */

/**
 * @typedef {Object} Split
 * @property {Attribute[]} attributes - The attributes of the split.
 * @property {SplitData[]} data - The data within the split.
 * @property {Array<string>|null} key - The key of the split.
 */

/**
 * @typedef {Object} SplitData
 * @property {string} [attributeName] - The user attribute value.
 * @property {Split} SPLIT - The user attribute value.
 */

/**
 * Represents overall data.
 * @typedef {Object} ExtractData
 * @property {number} level - The level of the data.
 * @property {Object} parent - The parent object.
 * @property {string} name - The name of the data.
 * @property {string} [attributeName] - the data from 'attributeName'
 */

/**
 * Extracts data from a nested structure and returns an array of objects with specified headers, levels, and parent attributes.
 * @param {Array<SplitData>} data - The nested data structure to extract data from.
 * @param {Array} [header=[]] - The array of header keys to extract data from, default is an empty array.
 * @param {number} [level=0] - The level of nesting, default is 0.
 * @param {Object} [parent={}] - The parent object of the extracted data, default is an empty object.
 * @param {string} [key=null] - The key to extract names from, default is null.
 * @returns {Array<ExtractData>} Returns an array of objects containing extracted data with headers, levels, and parent attributes.
 */
export const extractData = (data, header = [], level = 0, parent = {}, key = null) => {
  let result = [];

  for (let event of data) {
    const eventName = event[key];

    const data = {
      'level': level,
      'parent': {},
    };

    if (eventName) {
      data['name'] = eventName;
    } else {
      data['name'] = 'Overall';
    }

    for (let key of header) {
      data[key] = event[key];
      data['parent'][key] = parent[key];
    }

    result.push(data);

    if (event["SPLIT"]) {
      let nestedResult = extractData(event.SPLIT.data, header, level + 1, data, event.SPLIT.key[0]);

      result = result.concat(nestedResult);
    }
  }

  return result;
};

/**
 * Checks if the given data is an array.
 * @param {*} data - The data to be checked.
 * @returns {boolean} Returns true if the data is an array, otherwise false.
 */
export const isArray = (data) => {
  return Array.isArray(data)
}

/**
 * Checks if the given data is an object.
 * @param {*} data - The data to be checked.
 * @returns {boolean} Returns true if the data is an object, otherwise false.
 */
export const isObject = (data) => {
  return typeof data === 'object' && !Array.isArray(data);
}

/**
 * Checks if the given data is undefined or empty.
 * @param {*} value - The data to be checked.
 * @returns {boolean} Returns true if the data is undefined or empty, otherwise false.
 */
export const isUndefinedOrEmpty = (value) => {
  const conditions = [
    value === undefined,
    value === null,
    value === 'undefined',
    typeof value === 'string' && value.trim() === '',
    Array.isArray(value) && value.length === 0,
    typeof value === 'object' && Object.keys(value).length === 0,
  ];


  return conditions.some(element => element === true);
}


/**
 * Checks if two arrays contain the same elements, regardless of their order.
 * @param {Array} array1 - The first array to compare.
 * @param {Array} array2 - The second array to compare.
 * @returns {boolean} Returns true if the arrays contain the same elements, false otherwise.
 */
export const areArraysEqual = (array1, array2) => {
  // Check if arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Convert arrays to sets to remove duplicate elements
  const set1 = new Set(array1);
  const set2 = new Set(array2);

  // Check if the sets have the same size
  if (set1.size !== set2.size) {
    return false;
  }

  // Check if all elements in set1 are in set2
  for (let item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  // If all elements are equal, return true
  return true;
}


export function stringify(queryObject = {}) {
  if (typeof queryObject !== 'object' || queryObject === null) {
    throw new Error('The argument must be an object');
  }

  const queryString = Object.entries(queryObject)
    .map(([key, value]) => {
      if (typeof value === 'undefined') return ''; // Skip undefined values
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean) // Remove empty values
    .join('&');

  return queryString;
}

export function getMonthName(month) {
  // Create an array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  // Check if the provided month number is within range
  if (month >= 1 && month <= 12) {
    // Subtract 1 from the month number to get the correct index in the array
    return monthNames[month - 1];
  } else {
    return "Invalid month number";
  }
}
