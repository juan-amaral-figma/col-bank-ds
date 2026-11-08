import { type ReactNode } from 'react';
import { type PanelProps } from '../_shared/Panel/Panel.types';
import { type ButtonProps } from '../../atoms/Button/Button.types';
import { type Recipient } from '../RecipientSelector/RecipientSelector.types';

export interface TransferFormProps extends Omit<PanelProps, 'onSubmit'> {
  recipient?: Recipient;
  currency?: string;
  amountLabel?: string;
  helperText?: string;
  submitLabel?: string;
  invalidAmountMessage?: string;
  missingRecipientMessage?: string;
  onSubmit?: (values: TransferValues) => void | Promise<void>;
  recipientSummary?: ReactNode;
  amountField?: ReactNode;
  continueButton?: ReactNode;
  error?: string;
  defaultAmount?: string;
  submitting?: boolean;
  submitProps?: Omit<ButtonProps, 'onClick' | 'type'>;
}

export interface TransferValues {
  amount: string;
  currency: string;
  recipientId: string;
}
