export const LocalStorageUtil = {
    /**
     * Sets an item in localStorage.
     * @param key - The key under which the value is stored.
     * @param value - The value to store. Can be an object, array, string, number, or boolean.
     */
    setItem: <T>(key: string, value: T): void => {
      try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
      } catch (error) {
        console.error(`Error setting item in localStorage: ${error}`);
      }
    },
  
    /**
     * Gets an item from localStorage.
     * @param key - The key of the item to retrieve.
     * @returns The parsed value, or null if the item doesn't exist or parsing fails.
     */
    getItem: <T>(key: string): T | null => {
      try {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
      } catch (error) {
        console.error(`Error getting item from localStorage: ${error}`);
        return null;
      }
    },
  
    /**
     * Removes an item from localStorage.
     * @param key - The key of the item to remove.
     */
    removeItem: (key: string): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item from localStorage: ${error}`);
      }
    },
  
    /**
     * Clears all items in localStorage.
     */
    clear: (): void => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
      }
    },
  };