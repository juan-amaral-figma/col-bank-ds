import { useControllable } from '../../../hooks/useControllable';
import { cx } from '../../../utils/cx';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { type TransactionFiltersProps, type TransactionFilter } from './TransactionFilters.types';

export function TransactionFilters({
  value,
  defaultValue = 'all',
  onChange,
  label = 'Filtrar movimientos',
  labels = { all: 'Todos', incoming: 'Entradas', outgoing: 'Salidas', pending: 'Pendientes' },
  icon,
  children,
  className,
  ...props
}: TransactionFiltersProps) {
  const [selected, setSelected] = useControllable(value, defaultValue, onChange);
  return (
    <div {...props} className={cx('col-filters', className)} role="group" aria-label={label}>
      <span className="col-row col-body-small">
        {icon ?? <Icon name="transfer" />}
        {label}
      </span>
      <div className="col-filter-buttons">
        {children ??
          (Object.keys(labels) as TransactionFilter[]).map((key) => (
            <Button
              key={key}
              size="sm"
              hierarchy={selected === key ? 'primary' : 'secondary'}
              aria-pressed={selected === key}
              onClick={() => setSelected(key)}
            >
              {labels[key]}
            </Button>
          ))}
      </div>
    </div>
  );
}
