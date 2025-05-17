// Util
export function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const isNullOrUndefined = (input: any) => {
  return input === null || input === undefined;
};

export const isNullOrUndefinedOrEmpty = (input: any) => {
  return input === null || input === undefined || input === "";
};

export const getDistinct = (input: Array<Object>, selector?: any) => {
  return Array.from(
    new Set(input?.map((item: any) => (selector ? selector(item) : item)))
  );
};

export const toCamelCase = (input: string) => {
  if (isNullOrUndefined(input) || !input.length) {
    return input;
  }

  return input
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const shuffleArray = (array) => {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

const fetcherJson = (url, token = null) => {
  if (!token) {
    return fetch(url).then((r) => r.json());
  }
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
};
const fetcherText = (url, token = null) => {
  if (!token) {
    return fetch(url).then((r) => r.text());
  }
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.text());
};

type ResponseValue = "text" | "json";

export const getFetcher = (
  condition,
  responseValue: ResponseValue = "json"
) => {
  if (!condition) {
    return async (_) => null;
  }

  switch (responseValue) {
    case "json":
      return fetcherJson;
    case "text":
      return fetcherText;
    default:
      return async (_) => null;
  }
};
export async function fetchWithTimeout(resource, options, _Timeout = {}) {
  const { timeout = 12000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

export const formatUserName = (givenName, familyName, placeholder = "") => {
  if (!givenName || !familyName) return placeholder;

  return `${givenName} ${familyName}`;
};
