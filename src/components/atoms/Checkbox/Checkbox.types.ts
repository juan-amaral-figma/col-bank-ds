import { type InputHTMLAttributes, type ReactNode } from 'react';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label: string;
  showLabel?: boolean;
  indeterminate?: boolean;
  indicator?: ReactNode;
}
