import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface QuickActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: ReactNode;
  actionButton?: ReactNode;
}
