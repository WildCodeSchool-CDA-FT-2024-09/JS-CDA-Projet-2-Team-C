import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import QuickSearch from './QuickSearch';

describe('Test du composant QuickSearch', () => {
  it('Should render the QuickSearch component with links', () => {
    render(
      // Crée un faux router pour simuler les link
      <MemoryRouter>
        <QuickSearch />
      </MemoryRouter>
    );

    // Le i permet d'accepter les minuscules ou majuscules pour eviter la casse
    const serviceLink = screen.getByRole('link', { name: /Service/i });
    const doctorLink = screen.getByRole('link', { name: /Docteur/i });
    const patientLink = screen.getByRole('link', { name: /Patient/i });

    // Vérifie si les liens affichent le bon texte
    expect(serviceLink).toHaveTextContent('Service');
    expect(doctorLink).toHaveTextContent('Docteur');
    expect(patientLink).toHaveTextContent('Patient');

    // Vérifie si les liens pointent vers les bonnes URLs
    expect(serviceLink).toHaveAttribute('href', '/rechercher/service');
    expect(doctorLink).toHaveAttribute('href', '/doctor');
    expect(patientLink).toHaveAttribute('href', '/patient');
  });
});
