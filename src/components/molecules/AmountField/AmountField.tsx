import { forwardRef, useId, isValidElement, cloneElement, type ReactElement } from 'react';
import { cx } from '../../../utils/cx';
import { TextInput } from '../../atoms/TextInput';
import { type TextInputProps } from '../../atoms/TextInput/TextInput.types';
import { type AmountFieldProps } from './AmountField.types';

export const AmountField = forwardRef<HTMLInputElement, AmountFieldProps>(function AmountField(
  { currency = 'COP', amountInput, wrapperClassName, className, ...props },
  ref,
) {
  const id = useId();
  if (amountInput) {
    const hintId = `${props.id ?? id}-amount-hint`;
    const input = isValidElement(amountInput)
      ? cloneElement(amountInput as ReactElement<TextInputProps>, {
          ...props,
          id: props.id ?? id,
          showHelper: false,
          helperText: undefined,
          error: props.error ? true : undefined,
          'aria-describedby': props.error || props.helperText ? hintId : undefined,
        })
      : amountInput;
    return (
      <div className={cx('col-amount-composition', wrapperClassName)}>
        <span className="col-body-small">{props.label}</span>
        <div className="col-row">
          <span className="col-currency">{currency}</span>
          {input}
        </div>
        {(props.error || props.helperText) && (
          <div id={hintId} className="col-helper" role={props.error ? 'alert' : undefined}>
            {props.error || props.helperText}
          </div>
        )}
      </div>
    );
  }
  return (
    <TextInput
      {...props}
      ref={ref}
      inputMode={props.inputMode ?? 'decimal'}
      wrapperClassName={cx('col-amount-field', wrapperClassName)}
      className={cx('col-amount-shell', className)}
      leading={<span className="col-currency">{currency}</span>}
    />
  );
});
