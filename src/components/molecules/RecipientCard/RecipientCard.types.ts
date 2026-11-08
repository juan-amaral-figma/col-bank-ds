import { type HTMLAttributes, type ReactNode } from 'react';

export interface RecipientCardProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  recipientName: string;
  initials: string;
  bank: string;
  accountNumber: string;
  selected?: boolean;
  defaultSelected?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  selectionControl?: ReactNode;
  readOnly?: boolean;
}
