import { cx } from '../../../utils/cx';
import { Icon } from '../Icon';
import { type BadgeProps } from './Badge.types';

export function Badge({ tone = 'neutral', label, icon, className, ...props }: BadgeProps) {
  return (
    <span {...props} className={cx('col-badge', `col-badge--${tone}`, className)}>
      {icon ??
        (tone !== 'neutral' && <Icon name={tone === 'success' ? 'check' : 'close'} size={16} />)}
      {label}
    </span>
  );
}
