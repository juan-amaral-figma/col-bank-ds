import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransferForm } from '.';
import { recipients } from '../../../../stories/shared/fixtures';

describe('TransferForm', () => {
  it('rejects invalid amounts and submits normalized decimal strings', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TransferForm recipient={recipients[0]} onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: 'Monto a transferir' });
    await user.type(input, '-10');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByRole('alert')).toHaveTextContent('mayor que cero');
    expect(onSubmit).not.toHaveBeenCalled();
    await user.clear(input);
    await user.type(input, '150,25');
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(onSubmit).toHaveBeenCalledWith({
      amount: '150.25',
      currency: 'COP',
      recipientId: 'maria',
    });
  });
  it('announces submit failures and prevents duplicate submissions while pending', async () => {
    const user = userEvent.setup();
    let reject!: (error: Error) => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((_, r) => {
          reject = r;
        }),
    );
    render(<TransferForm recipient={recipients[0]} defaultAmount="125" onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: 'Continuar' }));
    expect(screen.getByRole('button')).toBeDisabled();
    await user.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledOnce();
    reject(new Error('Intenta de nuevo'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Intenta de nuevo');
  });
});
