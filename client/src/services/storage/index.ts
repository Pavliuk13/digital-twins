interface ILocalStorageService {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  removeAll: () => void;
}

class LocalStorageService implements ILocalStorageService {
  private storageNamespace = 'smartlab__';

  public get<T>(key: string): T | null {
    const data: string | null = window.localStorage.getItem(
      `${this.storageNamespace}${key}`,
    );

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  public set<T>(key: string, value: T) {
    const objValue = JSON.stringify(value);

    window.localStorage.setItem(`${this.storageNamespace}${key}`, objValue);
  }

  public remove(key: string) {
    window.localStorage.removeItem(`${this.storageNamespace}${key}`);
  }

  public removeAll() {
    const storage = window.localStorage || {};
    Object.keys(storage).forEach((key: string) => {
      if (key.startsWith(this.storageNamespace)) {
        window.localStorage.removeItem(key);
      }
    });
  }
}

export const LocalStorage = new LocalStorageService();
