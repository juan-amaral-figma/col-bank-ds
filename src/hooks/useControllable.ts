import { useState } from 'react';

export function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [internal, setInternal] = useState(defaultValue);
  return [
    value === undefined ? internal : value,
    (next: T) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    },
  ] as const;
}
