import { Panel } from '../_shared/Panel';
import { AccountCard } from '../../molecules/AccountCard';
import { type AccountOverviewProps } from './AccountOverview.types';

export function AccountOverview({
  heading = 'Tus cuentas',
  accounts = [],
  balanceHidden,
  children,
  ...props
}: AccountOverviewProps) {
  return (
    <Panel {...props} heading={heading}>
      {children ??
        accounts.map(({ id, ...account }) => (
          <AccountCard
            key={id}
            {...account}
            balanceHidden={balanceHidden ?? account.balanceHidden}
          />
        ))}
    </Panel>
  );
}
