import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconButton } from '.';
import { Icon } from '../Icon';

describe('IconButton', () => {
  it('provides an accessible name for icon-only actions', () => {
    render(<IconButton aria-label="Buscar" icon={<Icon name="search" />} />);
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeVisible();
  });
});
