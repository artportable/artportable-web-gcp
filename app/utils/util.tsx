// Util
export function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const isNullOrUndefined = (input: any) => {
  return input === null || input === undefined;
}
