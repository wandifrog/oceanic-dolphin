export function getSessionStorage(key: string, initialValue?: any) {
  const storedValue = window.sessionStorage.getItem(key);
  if (storedValue)
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      return initialValue;
    }
  else {
    return initialValue;
  }
}

export function setSessionStorage(key: string, value: any) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function uuid() {
  const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  return result;
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json());
