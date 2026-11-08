import { Panel } from '../_shared/Panel';
import { QuickAction } from '../../molecules/QuickAction';
import { type QuickActionsPanelProps } from './QuickActionsPanel.types';

export function QuickActionsPanel({
  heading = '¿Qué quieres hacer?',
  actions = [],
  disabled,
  children,
  ...props
}: QuickActionsPanelProps) {
  return (
    <Panel {...props} heading={heading}>
      <div className="col-actions-grid">
        {children ??
          actions.map(({ id, ...action }) => (
            <QuickAction key={id} {...action} disabled={disabled || action.disabled} />
          ))}
      </div>
    </Panel>
  );
}
