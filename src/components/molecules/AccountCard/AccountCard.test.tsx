import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccountCard, Alert, Button, Icon } from '../../..';

import { iconAssets } from '../../atoms/Icon/icons';

const account = { accountType: 'Ahorros', accountNumber: '•••• 4582', balance: '$2.450.000' };
function expectVisibilityIcon(name: 'eye' | 'eye-off') {
  const button = screen.getByRole('button', {
    name: name === 'eye' ? 'Ocultar saldo' : 'Mostrar saldo',
  });
  expect(button.querySelector('.col-icon')).toHaveStyle({
    maskImage: `url(${JSON.stringify(iconAssets[name])})`,
  });
}

describe('AccountCard', () => {
  it('toggles amount, icon and accessible action without leaking hidden balance', async () => {
    const user = userEvent.setup();
    render(<AccountCard {...account} />);
    expectVisibilityIcon('eye');
    await user.click(screen.getByRole('button', { name: 'Ocultar saldo' }));
    expect(screen.queryByText(account.balance)).not.toBeInTheDocument();
    expectVisibilityIcon('eye-off');
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Mostrar saldo' }));
    expect(screen.getByText(account.balance)).toBeVisible();
    expectVisibilityIcon('eye');
  });

  it('preserves controlled state, callback and default hidden state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <AccountCard {...account} balanceHidden onBalanceHiddenChange={onChange} />,
    );
    expectVisibilityIcon('eye-off');
    await user.click(screen.getByRole('button', { name: 'Mostrar saldo' }));
    expect(onChange).toHaveBeenCalledWith(false);
    expect(screen.queryByText(account.balance)).not.toBeInTheDocument();
    rerender(<AccountCard {...account} balanceHidden={false} onBalanceHiddenChange={onChange} />);
    expectVisibilityIcon('eye');
    rerender(<AccountCard key="default" {...account} defaultBalanceHidden />);
    expectVisibilityIcon('eye-off');
  });

  it('accepts an alert or multiple buttons below the balance and leaves an empty region empty', () => {
    const { container, rerender } = render(<AccountCard {...account} />);
    expect(container.querySelector('.col-account-card__content')).toBeEmptyDOMElement();
    rerender(
      <AccountCard {...account}>
        <Alert message="Saldo bajo" />
      </AccountCard>,
    );
    const region = container.querySelector('.col-account-card__content')!;
    expect(region).toContainElement(screen.getByRole('alert'));
    rerender(
      <AccountCard {...account}>
        <Button icon={<Icon name="transfer" />}>Transferir</Button>
        <Button icon={<Icon name="payment" />}>Pagar</Button>
      </AccountCard>,
    );
    expect(region.querySelectorAll('button')).toHaveLength(2);
    expect(
      container.querySelector('.col-money')!.compareDocumentPosition(region) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('preserves existing custom slots and accessible labels', () => {
    render(
      <AccountCard
        {...account}
        icon={<span>Custom icon</span>}
        visibilityButton={<button>Custom visibility</button>}
        divider={<hr />}
        balanceLabel="Balance"
        hideBalanceLabel="Hide"
      />,
    );
    expect(screen.getByText('Custom icon')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Custom visibility' })).toBeVisible();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeVisible();
  });
});
