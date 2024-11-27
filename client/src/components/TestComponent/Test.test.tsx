import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Test from './Test';

describe('Test de mon composant Test', () => {
  it('Should render a test', async () => {
    render(<Test test="Test du h1" />);

    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toHaveTextContent('Test du h1');
  });
});
