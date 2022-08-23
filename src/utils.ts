export const convertToKebabCase = (s: string): string =>
  s.toLowerCase().split(" ").join("-");
