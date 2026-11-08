import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccountCard } from '.';

describe('AccountCard', () => {
  it('hides and restores account balances without leaking the amount into hidden DOM', async () => {
    const user = userEvent.setup();
    render(<AccountCard accountType="Ahorros" accountNumber="4582" balance="$2.450.000" />);
    await user.click(screen.getByRole('button', { name: 'Ocultar saldo' }));
    expect(screen.queryByText('$2.450.000')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mostrar saldo' }));
    expect(screen.getByText('$2.450.000')).toBeVisible();
  });
});
