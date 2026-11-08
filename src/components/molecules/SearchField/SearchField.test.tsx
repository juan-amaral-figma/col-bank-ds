import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchField } from '.';

describe('SearchField', () => {
  it('clears uncontrolled search input and notifies the consumer', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchField label="Buscar" defaultValue="María" onClear={onClear} />);
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }));
    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(onClear).toHaveBeenCalledOnce();
  });
});
