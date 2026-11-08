import { type PanelProps } from '../_shared/Panel/Panel.types';
import { type AccountCardProps } from '../../molecules/AccountCard/AccountCard.types';

export interface AccountOverviewProps extends PanelProps {
  accounts?: (AccountCardProps & { id: string })[];
  balanceHidden?: boolean;
}
