import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('announces the message with a decorative information icon', () => {
    render(<Alert message="Saldo bajo" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Saldo bajo');
    expect(screen.getByRole('alert').querySelector('.col-icon')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});
