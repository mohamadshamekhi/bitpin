export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name) => {
  let data = localStorage.getItem(name);
  return data ? JSON.parse(data) : null;
};
