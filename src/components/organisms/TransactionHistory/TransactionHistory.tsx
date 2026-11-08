import { useState } from 'react';
import { Panel } from '../_shared/Panel';
import { SearchField } from '../../molecules/SearchField';
import { TransactionItem } from '../../molecules/TransactionItem';
import { type TransactionHistoryProps } from './TransactionHistory.types';

export function TransactionHistory({
  heading = 'Movimientos recientes',
  transactions = [],
  searchLabel = 'Buscar movimientos',
  searchPlaceholder = 'Buscar movimiento',
  emptyHeading = 'Aún no tienes movimientos',
  emptyDescription = 'Tus entradas y salidas aparecerán aquí.',
  searchField,
  children,
  filter = 'all',
  ...props
}: TransactionHistoryProps) {
  const [query, setQuery] = useState('');
  const matches = transactions.filter(
    (t) =>
      `${t.transactionName} ${t.date} ${t.amount}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()) &&
      (filter === 'all' ||
        (filter === 'pending' ? t.status === 'pending' : t.direction === filter)),
  );
  return (
    <Panel {...props} heading={heading}>
      {searchField ?? (
        <SearchField
          label={searchLabel}
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => setQuery('')}
        />
      )}
      <div className="col-stack" aria-live="polite">
        {children ??
          (matches.length ? (
            matches.map(({ id, ...item }) => <TransactionItem key={id} {...item} />)
          ) : (
            <div className="col-empty">
              <strong>{emptyHeading}</strong>
              <p>{emptyDescription}</p>
            </div>
          ))}
      </div>
    </Panel>
  );
}
