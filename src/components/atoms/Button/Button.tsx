import { forwardRef } from 'react';
import { cx } from '../../../utils/cx';
import { type ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    hierarchy = 'primary',
    size = 'md',
    loading = false,
    disabled,
    icon,
    children,
    loadingLabel,
    className,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'col-button',
        `col-button--${hierarchy}`,
        `col-button--${size}`,
        className,
      )}
    >
      {loading ? <span className="col-spinner" aria-hidden="true" /> : icon}
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  );
});
