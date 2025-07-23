export const arrayToObject = (array: any[]) =>
  array.reduce((acc, cur) => ({ ...acc, ...cur }), {});

export const delayMilliseconds = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));
