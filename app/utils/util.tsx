// Util
export function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const isNullOrUndefined = (input: any) => {
  return input === null || input === undefined;
}

export const getDistinct = (input: Array<Object>, selector?: any) => {
  return Array.from(new Set(input.map((item: any) => selector ? selector(item) : item)))
}

export const toCamelCase = (input: string) => {
  if (isNullOrUndefined(input) || !input.length) {
    return input;
  }

  return input.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
