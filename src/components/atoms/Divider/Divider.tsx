import { cx } from '../../../utils/cx';
import { type DividerProps } from './Divider.types';

export function Divider({
  orientation = 'horizontal',
  decorative = true,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      {...props}
      className={cx('col-divider', `col-divider--${orientation}`, className)}
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
}
