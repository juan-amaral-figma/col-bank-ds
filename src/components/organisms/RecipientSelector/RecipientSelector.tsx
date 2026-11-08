import { useState, useId, useMemo } from 'react';
import { Panel } from '../_shared/Panel';
import { useControllable } from '../../../hooks/useControllable';
import { RecipientCard } from '../../molecules/RecipientCard';
import { SearchField } from '../../molecules/SearchField';
import { type RecipientSelectorProps } from './RecipientSelector.types';

export function RecipientSelector({
  heading = 'Elige un destinatario',
  recipients = [],
  value,
  defaultValue = '',
  onChange,
  searchLabel = 'Buscar destinatarios',
  searchPlaceholder = 'Buscar destinatario',
  emptyHeading = 'No encontramos destinatarios',
  emptyDescription = 'Prueba con otro nombre o número de cuenta.',
  searchField,
  children,
  ...props
}: RecipientSelectorProps) {
  const [selected, setSelected] = useControllable(value, defaultValue, onChange);
  const [query, setQuery] = useState('');
  const group = useId();
  const matches = useMemo(
    () =>
      recipients.filter((r) =>
        `${r.recipientName} ${r.accountNumber} ${r.bank}`
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
      ),
    [recipients, query],
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
      <div className="col-stack" role="group" aria-label={heading}>
        {children ??
          (matches.length ? (
            matches.map(({ id, ...recipient }) => (
              <RecipientCard
                key={id}
                {...recipient}
                name={group}
                value={id}
                selected={selected === id}
                onChange={setSelected}
              />
            ))
          ) : (
            <div className="col-empty" role="status">
              <strong>{emptyHeading}</strong>
              <p>{emptyDescription}</p>
            </div>
          ))}
      </div>
    </Panel>
  );
}
