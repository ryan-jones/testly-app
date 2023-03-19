export const isString = (value: any): boolean => typeof value === 'string';

export const isObject = (value: any): boolean =>
  typeof value === 'object' && !isArray(value);

export const isArray = (value: any): boolean => Array.isArray(value);

export const isError = (value: any): boolean => value instanceof Error;
