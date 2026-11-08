import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checkbox } from '.';

describe('Checkbox', () => {
  it('allows checked and disabled states independently and supports indeterminate', () => {
    const { rerender } = render(<Checkbox label="Términos" checked disabled readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('checkbox')).toBeDisabled();
    rerender(<Checkbox label="Términos" indeterminate />);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });
});
