import { forwardRef, useId } from 'react';
import { cx } from '../../../utils/cx';
import { Icon } from '../Icon';
import { type TextInputProps } from './TextInput.types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    helperText,
    error,
    showHelper = true,
    leading,
    trailing,
    wrapperClassName,
    className,
    id,
    errorIcon,
    'aria-describedby': describedBy,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const message = error || (showHelper && helperText);
  const hintId = `${fieldId}-hint`;
  return (
    <div
      className={cx('col-field', wrapperClassName)}
      data-disabled={props.disabled || undefined}
      data-error={!!error || undefined}
    >
      <label htmlFor={fieldId} className="col-body-small">
        {label}
      </label>
      <div className={cx('col-input-shell', className)}>
        {leading}
        <input
          {...props}
          id={fieldId}
          ref={ref}
          aria-invalid={!!error || props['aria-invalid'] || undefined}
          aria-describedby={
            [describedBy, message ? hintId : undefined].filter(Boolean).join(' ') || undefined
          }
        />
        {trailing}
      </div>
      {message && (
        <div id={hintId} className="col-helper" role={error ? 'alert' : undefined}>
          {error && (errorIcon ?? <Icon name="close" size={16} />)}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
});
