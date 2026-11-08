import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from './Icon';
import { iconAssets } from './icons';

describe('Icon', () => {
  it('keeps every existing name and adds balance, payment and info icons', () => {
    const names = [
      'home',
      'transfer',
      'wallet',
      'credit-card',
      'search',
      'notification',
      'arrow',
      'check',
      'close',
      'eye',
      'eye-off',
      'payment',
      'info',
    ] as const;
    for (const name of names) {
      expect(iconAssets[name]).toBeTruthy();
      const { unmount } = render(<Icon name={name} label={name} />);
      expect(screen.getByRole('img', { name })).toHaveStyle({
        maskImage: `url("${iconAssets[name]}")`,
      });
      unmount();
    }
  });
});
