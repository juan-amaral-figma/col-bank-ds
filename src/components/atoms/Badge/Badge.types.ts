import { type HTMLAttributes, type ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'success' | 'error' | 'neutral';
  label: string;
  icon?: ReactNode;
}
