export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error("Error loading from local storage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
