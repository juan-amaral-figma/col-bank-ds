import { useId } from 'react';
import { cx } from '../../../../utils/cx';
import { type PanelProps } from './Panel.types';

export function Panel({ heading, children, className, ...props }: PanelProps) {
  const id = useId();
  return (
    <section
      {...props}
      className={cx('col-panel', className)}
      aria-labelledby={heading ? id : props['aria-labelledby']}
    >
      {heading && (
        <h2 id={id} className="col-heading-small">
          {heading}
        </h2>
      )}
      {children}
    </section>
  );
}
