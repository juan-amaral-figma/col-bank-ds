import { forwardRef } from 'react';
import { cx } from '../../../utils/cx';
import { Icon } from '../../atoms/Icon';
import { type QuickActionProps } from './QuickAction.types';

export const QuickAction = forwardRef<HTMLButtonElement, QuickActionProps>(function QuickAction(
  { label, icon, actionButton, className, type = 'button', ...props },
  ref,
) {
  if (actionButton)
    return (
      <div className={cx('col-quick-action', className)}>
        {actionButton}
        <span>{label}</span>
      </div>
    );
  return (
    <button {...props} type={type} ref={ref} className={cx('col-quick-action', className)}>
      <span className="col-action-icon" aria-hidden="true">
        {actionButton ?? icon ?? <Icon name="transfer" />}
      </span>
      <span>{label}</span>
    </button>
  );
});
