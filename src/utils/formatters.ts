export const parse = (val: string) => {
  return isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
};
