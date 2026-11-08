import { type ReactNode } from 'react';
import { type TextInputProps } from '../../atoms/TextInput/TextInput.types';

export interface SearchFieldProps extends Omit<TextInputProps, 'leading' | 'trailing'> {
  showClear?: boolean;
  clearLabel?: string;
  onClear?: () => void;
  searchIcon?: ReactNode;
  clearButton?: ReactNode;
}
