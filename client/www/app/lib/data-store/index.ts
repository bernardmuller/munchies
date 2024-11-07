const STORE_KEY = 'MUNCHIES';

type StorageValue = Record<string, any> | null;

// Helper to parse storage content safely
const parseStorage = (storage: string | null): Record<string, any> => {
  try {
    return storage ? JSON.parse(storage) : {};
  } catch {
    return {};
  }
};

// Set a key-value pair in session storage
export const setItem = (key: string, value: any): void => {
  if (!key) return;

  const storage = parseStorage(sessionStorage.getItem(STORE_KEY));
  storage[key] = value;
  sessionStorage.setItem(STORE_KEY, JSON.stringify(storage));
};

// Get a value by key from session or fallback to local storage
export const getItem = (key: string): any => {
  if (!key) return;

  const sessionData = parseStorage(sessionStorage.getItem(STORE_KEY));
  let value = sessionData[key];

  if (value === undefined || value === null) {
    const localData = parseStorage(localStorage.getItem(STORE_KEY));
    value = localData[key];
  }

  return value;
};

// Remove a key from session storage
export const removeItem = (key: string): void => {
  if (!key) return;

  const storage = parseStorage(sessionStorage.getItem(STORE_KEY));
  delete storage[key];
  sessionStorage.setItem(STORE_KEY, JSON.stringify(storage));
};

// Clear all data from both session and local storage
export const clearAll = (): void => {
  sessionStorage.removeItem(STORE_KEY);
  localStorage.removeItem(STORE_KEY);
};

// Clone session storage to local storage
export const clonePersistingStore = (): void => {
  const sessionData = sessionStorage.getItem(STORE_KEY);
  if (sessionData) {
    localStorage.setItem(STORE_KEY, sessionData);
  }
};