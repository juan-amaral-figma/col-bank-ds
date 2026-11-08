import { type PanelProps } from '../_shared/Panel/Panel.types';
import { type QuickActionProps } from '../../molecules/QuickAction/QuickAction.types';

export interface QuickActionsPanelProps extends PanelProps {
  actions?: (QuickActionProps & { id: string })[];
  disabled?: boolean;
}
