import { useId } from 'react';
import { cx } from '../../../utils/cx';
import { type RecipientCardProps } from './RecipientCard.types';

export function RecipientCard({
  recipientName,
  initials,
  bank,
  accountNumber,
  selected,
  defaultSelected,
  disabled,
  name,
  value,
  onChange,
  selectionControl,
  readOnly,
  className,
  ...props
}: RecipientCardProps) {
  const id = useId();
  if (selectionControl)
    return (
      <div
        className={cx('col-recipient-card', className)}
        data-selected={selected || defaultSelected || undefined}
      >
        <span className="col-avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="col-grow">
          <span className="col-recipient-name">{recipientName}</span>
          <span className="col-muted col-body-small">{bank}</span>
          <span className="col-muted col-label-small">{accountNumber}</span>
        </span>
        {selectionControl}
      </div>
    );
  return (
    <label
      {...props}
      className={cx('col-recipient-card', className)}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
    >
      <span className="col-avatar" aria-hidden="true">
        {initials}
      </span>
      <span className="col-grow">
        <span className="col-recipient-name">{recipientName}</span>
        <span className="col-muted col-body-small">{bank}</span>
        <span className="col-muted col-label-small">{accountNumber}</span>
      </span>
      {selectionControl ? <span aria-hidden="true">{selectionControl}</span> : null}
      <input
        className={selectionControl ? 'col-sr-only' : 'col-recipient-radio'}
        type="radio"
        name={name ?? id}
        value={value}
        checked={selected}
        defaultChecked={defaultSelected}
        disabled={disabled}
        readOnly={readOnly ?? !onChange}
        onChange={onChange ? (e) => onChange(e.currentTarget.value) : undefined}
      />
    </label>
  );
}
