import { cx } from '../../../utils/cx';
import { Badge } from '../../atoms/Badge';
import { Icon } from '../../atoms/Icon';
import { type TransactionItemProps } from './TransactionItem.types';

export function TransactionItem({
  transactionName,
  date,
  amount,
  direction = 'incoming',
  status = 'completed',
  showStatus = true,
  completedLabel,
  pendingLabel = 'Pendiente',
  icon,
  statusBadge,
  className,
  ...props
}: TransactionItemProps) {
  return (
    <div {...props} className={cx('col-transaction', className)} data-direction={direction}>
      <span className="col-icon-tile">
        {icon ?? <Icon name={direction === 'incoming' ? 'wallet' : 'transfer'} />}
      </span>
      <div className="col-grow">
        <div>{transactionName}</div>
        <div className="col-muted col-label-small">{date}</div>
      </div>
      <div className="col-transaction-meta">
        <span className="col-transaction-amount">
          {direction === 'incoming' ? '+$' : '−$'} {amount}
        </span>
        {showStatus &&
          (statusBadge ?? (
            <Badge
              label={
                status === 'completed'
                  ? (completedLabel ?? (direction === 'incoming' ? 'Recibido' : 'Enviado'))
                  : pendingLabel
              }
              tone={status === 'completed' ? 'success' : 'neutral'}
            />
          ))}
      </div>
    </div>
  );
}
