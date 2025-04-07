export const local = {
  get: (key: string) => {
    return localStorage.getItem(key);
  },
  set: (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },
};
