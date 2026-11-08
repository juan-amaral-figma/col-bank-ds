import { type ReactNode } from 'react';
import { type PanelProps } from '../_shared/Panel/Panel.types';
import { type RecipientCardProps } from '../../molecules/RecipientCard/RecipientCard.types';

export interface RecipientSelectorProps extends Omit<PanelProps, 'onChange'> {
  recipients?: Recipient[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  searchLabel?: string;
  searchPlaceholder?: string;
  emptyHeading?: string;
  emptyDescription?: string;
  searchField?: ReactNode;
}

export interface Recipient extends Omit<
  RecipientCardProps,
  'selected' | 'defaultSelected' | 'onChange' | 'name' | 'value'
> {
  id: string;
}
