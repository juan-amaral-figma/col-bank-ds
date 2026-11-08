import { type HTMLAttributes } from 'react';

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'light' | 'dark';
}
