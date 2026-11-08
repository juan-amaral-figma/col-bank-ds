import { type InputHTMLAttributes } from 'react';

export interface RadioButtonProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label: string;
  showLabel?: boolean;
}
