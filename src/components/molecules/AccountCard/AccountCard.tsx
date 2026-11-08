import { useControllable } from '../../../hooks/useControllable';
import { cx } from '../../../utils/cx';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { IconButton } from '../../atoms/IconButton';
import { type AccountCardProps } from './AccountCard.types';

export function AccountCard({
  accountType,
  accountNumber,
  balance,
  balanceHidden,
  defaultBalanceHidden = false,
  onBalanceHiddenChange,
  balanceLabel = 'Saldo disponible',
  showBalanceLabel = 'Mostrar saldo',
  hideBalanceLabel = 'Ocultar saldo',
  icon,
  visibilityButton,
  divider,
  className,
  ...props
}: AccountCardProps) {
  const [hidden, setHidden] = useControllable(
    balanceHidden,
    defaultBalanceHidden,
    onBalanceHiddenChange,
  );
  return (
    <article
      {...props}
      className={cx('col-account-card', className)}
      aria-label={props['aria-label'] ?? `${accountType} ${accountNumber}`}
    >
      <div className="col-row">
        <span className="col-icon-tile">{icon ?? <Icon name="wallet" />}</span>
        <div className="col-grow">
          <div>{accountType}</div>
          <div className="col-muted col-body-small">{accountNumber}</div>
        </div>
        {visibilityButton ?? (
          <IconButton
            icon={<Icon name="eye" />}
            aria-label={hidden ? showBalanceLabel : hideBalanceLabel}
            aria-pressed={!hidden}
            onClick={() => setHidden(!hidden)}
          />
        )}
      </div>
      {divider ?? <Divider />}
      <div>
        <div className="col-label-small col-muted">{balanceLabel}</div>
        <div className="col-money" aria-live="polite">
          {hidden ? <span aria-label="••••">••••••</span> : balance}
        </div>
      </div>
    </article>
  );
}
