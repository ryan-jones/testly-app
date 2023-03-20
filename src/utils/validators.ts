export const isString = (value: any): boolean => typeof value === 'string';

export const isObject = (value: any): boolean =>
  typeof value === 'object' && !isArray(value);

export const isArray = (value: any): boolean => Array.isArray(value);

export const isError = (value: any): boolean => value instanceof Error;

export const checkForMatchKeys = (primary: any, match: any): boolean => {
  if (typeof primary !== typeof match) {
    return false;
  }
  if (isArray(primary) && isArray(match)) {
    if (primary.length !== match.length) return false;
    return primary.every((_: any, index: number) =>
      checkForMatchKeys(primary[index], match[index])
    );
  }

  if (isObject(primary) && isObject(match)) {
    return Object.keys(primary).every((key: string) => {
      if (!match[key]) {
        return false;
      }
      if (isObject(primary[key])) {
        if (!isObject(match[key])) return false;

        checkForMatchKeys(primary[key], match[key]);
      }

      if (isArray(primary[key])) {
        if (!isArray(match[key])) return false;

        return checkForMatchKeys(primary[key], match[key]);
      }

      return true;
    });
  }

  return false;
};
