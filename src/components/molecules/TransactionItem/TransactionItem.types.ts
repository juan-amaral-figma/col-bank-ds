import { type HTMLAttributes, type ReactNode } from 'react';

export interface TransactionItemProps extends HTMLAttributes<HTMLDivElement> {
  transactionName: string;
  date: string;
  amount: string;
  direction?: 'incoming' | 'outgoing';
  status?: 'completed' | 'pending';
  showStatus?: boolean;
  completedLabel?: string;
  pendingLabel?: string;
  icon?: ReactNode;
  statusBadge?: ReactNode;
}
