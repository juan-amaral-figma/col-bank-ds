import { type InputHTMLAttributes, type ReactNode } from 'react';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helperText?: ReactNode;
  error?: ReactNode;
  showHelper?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  wrapperClassName?: string;
  errorIcon?: ReactNode;
}
