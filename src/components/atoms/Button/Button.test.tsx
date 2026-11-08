import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('activates a button with the keyboard and blocks repeated loading actions', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Continuar</Button>);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
    rerender(
      <Button loading onClick={onClick}>
        Continuar
      </Button>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
