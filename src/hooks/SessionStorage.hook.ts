import { useState } from 'react';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = window.sessionStorage.getItem(key);
    if (storedValue)
      try {
        return JSON.parse(storedValue) as T;
      } catch (error) {
        return initialValue;
      }
    else {
      return initialValue;
    }
  });

  // useEffect(() => { // broken effect
  //   window.sessionStorage.setItem(key, JSON.stringify(value));
  // }, [value]);

  return [value, setValue];
}

export default useSessionStorage;
