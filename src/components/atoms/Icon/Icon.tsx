import { cx } from '../../../utils/cx';
import { type IconProps } from './Icon.types';
import { iconAssets } from './icons';

export function Icon({ name, size = 24, label, className, ...props }: IconProps) {
  return (
    <span
      {...props}
      className={cx('col-icon', className)}
      style={{
        ...props.style,
        width: size,
        height: size,
        maskImage: `url(${JSON.stringify(iconAssets[name])})`,
        WebkitMaskImage: `url(${JSON.stringify(iconAssets[name])})`,
      }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
