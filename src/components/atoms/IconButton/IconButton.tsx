import { forwardRef } from 'react';
import { cx } from '../../../utils/cx';
import { Button } from '../Button';
import { type IconButtonProps } from './IconButton.types';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { size = 'sm', icon, className, ...props },
  ref,
) {
  return (
    <Button {...props} ref={ref} size={size} className={cx('col-icon-button', className)}>
      {icon}
    </Button>
  );
});
