import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RadioButton } from '.';

describe('RadioButton', () => {
  it('keeps hidden labels accessible and groups native radio buttons', async () => {
    const user = userEvent.setup();
    render(
      <>
        <RadioButton label="Ahorros" showLabel={false} name="account" value="savings" />
        <RadioButton label="Corriente" name="account" value="checking" />
      </>,
    );
    await user.click(screen.getByRole('radio', { name: 'Ahorros' }));
    await user.click(screen.getByRole('radio', { name: 'Corriente' }));
    expect(screen.getByRole('radio', { name: 'Corriente' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Ahorros' })).not.toBeChecked();
  });
});
