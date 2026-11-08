import { type ReactNode } from 'react';
import { type PanelProps } from '../_shared/Panel/Panel.types';
import { type TransactionItemProps } from '../../molecules/TransactionItem/TransactionItem.types';
import { type TransactionFilter } from '../TransactionFilters/TransactionFilters.types';

export interface TransactionHistoryProps extends PanelProps {
  transactions?: (TransactionItemProps & { id: string })[];
  searchLabel?: string;
  searchPlaceholder?: string;
  emptyHeading?: string;
  emptyDescription?: string;
  searchField?: ReactNode;
  filter?: TransactionFilter;
}
