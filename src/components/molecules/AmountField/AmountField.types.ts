import { type ReactNode } from 'react';
import { type TextInputProps } from '../../atoms/TextInput/TextInput.types';

export interface AmountFieldProps extends TextInputProps {
  currency?: string;
  amountInput?: ReactNode;
}
