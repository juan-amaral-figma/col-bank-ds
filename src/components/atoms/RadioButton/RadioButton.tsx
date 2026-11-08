import { forwardRef } from 'react';
import { cx } from '../../../utils/cx';
import { type RadioButtonProps } from './RadioButton.types';

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { label, showLabel = true, className, ...props },
  ref,
) {
  return (
    <label className={cx('col-choice', className)} data-disabled={props.disabled || undefined}>
      <span className="col-choice-control">
        <input {...props} ref={ref} type="radio" />
        <span className="col-radio-dot" aria-hidden="true" />
      </span>
      <span className={showLabel ? undefined : 'col-sr-only'}>{label}</span>
    </label>
  );
});
