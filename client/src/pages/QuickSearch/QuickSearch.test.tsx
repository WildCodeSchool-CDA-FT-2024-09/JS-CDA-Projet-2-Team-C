import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import QuickSearch from './QuickSearch';

describe('Test QuickSearch component', () => {
  it('Should render the QuickSearch component with links', () => {
    render(
      <MemoryRouter>
        <QuickSearch />
      </MemoryRouter>
    );

    const serviceLink = screen.getByRole('link', { name: /Service/i });
    const doctorLink = screen.getByRole('link', { name: /Docteur/i });
    const patientLink = screen.getByRole('link', { name: /Patient/i });

    expect(serviceLink).toHaveTextContent('Service');
    expect(doctorLink).toHaveTextContent('Docteur');
    expect(patientLink).toHaveTextContent('Patient');

    expect(serviceLink).toHaveAttribute('href', '/rechercher/service');
    expect(doctorLink).toHaveAttribute('href', '/doctor');
    expect(patientLink).toHaveAttribute('href', '/patient');
  });
});
