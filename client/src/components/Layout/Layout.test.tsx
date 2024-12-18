import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageLayout } from './Layout';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../contexts/auth/useAuth', () => ({
  useAuth: () => ({
    user: { role: { label: 'doctor' } },
    setUser: vi.fn()
  })
}));

vi.mock('../../contexts/displayText/useDisplayText', () => ({
  useDisplayText: () => ({ t: vi.fn() })
}));

describe('Test du composant Layout', () => {
  it('Should display the Header component on /planning', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PageLayout page="/planning">Composant planning</PageLayout>
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation-desktop');
    expect(nav).toBeInTheDocument();
  });

  it('Should not display the Header component on /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PageLayout page="/">Composant login</PageLayout>
      </MemoryRouter>
    );

    const nav = screen.queryByRole('navigation-desktop');
    expect(nav).toBeNull();
  });

  it('Should display the correct text in header', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <PageLayout page="/planning">Composant planning</PageLayout>
      </MemoryRouter>
    );

    const title = screen.getByRole('title');
    expect(title.textContent).toBe('Planning');
  });
});
