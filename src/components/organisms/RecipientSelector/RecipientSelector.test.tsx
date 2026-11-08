import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipientSelector } from '.';
import { recipients } from '../../../../stories/shared/fixtures';

describe('RecipientSelector', () => {
  it('filters recipients, selects one, and recovers from an empty search', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RecipientSelector recipients={recipients} onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: /Carlos Rojas/ }));
    expect(onChange).toHaveBeenLastCalledWith('carlos');
    await user.type(screen.getByRole('searchbox'), 'nobody');
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent('No encontramos destinatarios');
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }));
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });
});
