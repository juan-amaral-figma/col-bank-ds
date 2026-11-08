import { forwardRef, useRef, useEffect } from 'react';
import { cx } from '../../../utils/cx';
import { Icon } from '../Icon';
import { type CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, showLabel = true, indeterminate = false, indicator, className, ...props },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (localRef.current) localRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className={cx('col-choice', className)} data-disabled={props.disabled || undefined}>
      <span className="col-choice-control">
        <input
          {...props}
          type="checkbox"
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
        />
        <span className="col-choice-indicator" aria-hidden="true">
          {indeterminate ? '−' : (indicator ?? <Icon name="check" size={16} />)}
        </span>
      </span>
      <span className={showLabel ? undefined : 'col-sr-only'}>{label}</span>
    </label>
  );
});
