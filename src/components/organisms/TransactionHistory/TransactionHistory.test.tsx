import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionHistory } from '.';
import { transactions } from '../../../../stories/shared/fixtures';

describe('TransactionHistory', () => {
  it('filters history by status and search query', async () => {
    const user = userEvent.setup();
    render(<TransactionHistory transactions={transactions} filter="pending" />);
    expect(screen.queryByText('Nómina')).not.toBeInTheDocument();
    expect(screen.getByText('Transferencia')).toBeVisible();
    await user.type(screen.getByRole('searchbox'), 'missing');
    expect(screen.queryByText('Transferencia')).not.toBeInTheDocument();
  });
});
