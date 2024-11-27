import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Test from './Test';

describe('Test de mon composant Test', () => {
  it('Should render a test', async () => {
    await render(<Test test="Test du h1" />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent).toBe('Test du h1');
  });
});
