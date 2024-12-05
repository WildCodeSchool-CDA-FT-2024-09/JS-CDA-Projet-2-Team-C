import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageLayout } from './Layout';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/auth/AuthContext';

describe('Test du composant Layout', () => {
  it('Should display the Header component on /planning', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <PageLayout page="/planning">Composant planning</PageLayout>
        </AuthProvider>
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation-desktop');
    expect(nav).toBeInTheDocument();
  });

  it('Should not display the Header component on /', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <PageLayout page="/">Composant login</PageLayout>
        </AuthProvider>
      </MemoryRouter>
    );

    const nav = screen.queryByRole('navigation-desktop');
    expect(nav).toBeNull();
  });

  it('Should display the correct text in header', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <PageLayout page="/planning">Composant planning</PageLayout>
        </AuthProvider>
      </MemoryRouter>
    );

    const title = screen.getByRole('title');
    expect(title.textContent).toBe('Planning');
  });
});
