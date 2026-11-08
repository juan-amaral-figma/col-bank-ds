import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionFilters } from '.';

describe('TransactionFilters', () => {
  it('updates filter selection using pressed-button semantics', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TransactionFilters onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Pendientes' }));
    expect(onChange).toHaveBeenCalledWith('pending');
    expect(screen.getByRole('button', { name: 'Pendientes' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
