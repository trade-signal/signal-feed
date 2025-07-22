export const arrayToObject = (array: any[]) =>
  array.reduce((acc, cur) => ({ ...acc, ...cur }), {});
