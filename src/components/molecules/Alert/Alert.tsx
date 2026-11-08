import { cx } from '../../../utils/cx';
import { Icon } from '../../atoms/Icon';
import type { AlertProps } from './Alert.types';

export function Alert({ message, icon, className, ...props }: AlertProps) {
  return (
    <div role="alert" {...props} className={cx('col-alert', className)}>
      {icon ?? <Icon name="info" />}
      <span>{message}</span>
    </div>
  );
}
