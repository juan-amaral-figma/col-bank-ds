import { type HTMLAttributes, type ReactNode } from 'react';

export interface AccountCardProps extends HTMLAttributes<HTMLElement> {
  accountType: string;
  /** Masked by the caller, e.g. •••• 4582. */
  accountNumber: string;
  balance: string;
  balanceHidden?: boolean;
  defaultBalanceHidden?: boolean;
  onBalanceHiddenChange?: (hidden: boolean) => void;
  balanceLabel?: string;
  showBalanceLabel?: string;
  hideBalanceLabel?: string;
  icon?: ReactNode;
  visibilityButton?: ReactNode;
  divider?: ReactNode;
}
