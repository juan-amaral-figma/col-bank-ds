import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextInput } from '.';

describe('TextInput', () => {
  it('associates labels and error text with inputs', async () => {
    render(
      <TextInput
        label="Cuenta"
        helperText="Solo números"
        error="La cuenta es obligatoria"
        required
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Cuenta' });
    expect(input).toHaveAccessibleDescription('La cuenta es obligatoria');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('La cuenta es obligatoria');
  });
});
