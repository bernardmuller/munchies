const STORE_KEY = 'MUNCHIES';

export class DataStore {

  static set(key, value) {

    if (!key) {
      return;
    }

    let munchiesStorage = sessionStorage.getItem(STORE_KEY) || '{}';

    munchiesStorage = JSON.parse(munchiesStorage);
    munchiesStorage[key] = value;

    sessionStorage.setItem(STORE_KEY, JSON.stringify(munchiesStorage));
  }

  static get(key) {

    if (!key) {
      return;
    }

    let munchiesStorage = sessionStorage.getItem(STORE_KEY) || '{}';
    munchiesStorage = JSON.parse(munchiesStorage);
    
    let val = munchiesStorage[key];

    if (val === undefined || val === null) {

      let munchiesStorage = localStorage.getItem(STORE_KEY) || '{}';
      munchiesStorage = JSON.parse(munchiesStorage);

      val = munchiesStorage[key];
    }

    return val;
  }

  static clear(key) {

    if (!key) {
      return;
    }

    let munchiesStorage = sessionStorage.getItem(STORE_KEY) || '{}';
    munchiesStorage = JSON.parse(munchiesStorage);

    delete munchiesStorage[key];

    sessionStorage.setItem(STORE_KEY, JSON.stringify(munchiesStorage));
  }

  static clearAll() {

    sessionStorage.removeItem(STORE_KEY);
    localStorage.removeItem(STORE_KEY);
  }

  static clonePersistingStore() {

    localStorage.setItem(
      STORE_KEY,
      sessionStorage.getItem('MUNCHIES_STORAGE')
    );
  }
}