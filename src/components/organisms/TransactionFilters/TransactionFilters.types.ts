import { type HTMLAttributes, type ReactNode } from 'react';

export interface TransactionFiltersProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: TransactionFilter;
  defaultValue?: TransactionFilter;
  onChange?: (filter: TransactionFilter) => void;
  label?: string;
  labels?: Record<TransactionFilter, string>;
  icon?: ReactNode;
  children?: ReactNode;
}

export type TransactionFilter = 'all' | 'incoming' | 'outgoing' | 'pending';
