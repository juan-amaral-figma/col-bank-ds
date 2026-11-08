import { cx } from '../../utils/cx';
import { type ThemeProviderProps } from './ThemeProvider.types';

export function ThemeProvider({ theme = 'light', className, ...props }: ThemeProviderProps) {
  return <div {...props} data-theme={theme} className={cx('col-theme', className)} />;
}
