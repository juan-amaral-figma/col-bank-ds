import { type ReactNode } from 'react';
import { type ButtonProps } from '../Button/Button.types';

export type IconButtonProps = Omit<ButtonProps, 'children' | 'size' | 'icon'> & {
  'aria-label': string;
  icon: ReactNode;
  size?: 'sm' | 'md';
};
