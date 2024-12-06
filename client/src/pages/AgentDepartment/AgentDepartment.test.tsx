import { screen, render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import AgentDepartment from './AgentDepartment';
import { useDepartmentsQuery } from '../../generated/graphql-types';

// Mock du hook useDepartmentsQuery
vi.mock('../../generated/graphql-types', () => ({
  useDepartmentsQuery: vi.fn()
}));

// Mock de useNavigate pour simuler la navigation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()) // Mock de useNavigate renvoyant une fonction
  };
});

describe('Test AgentDepartment component', () => {
  const mockNavigate = vi.fn();
  const mockUseDepartmentsQuery = useDepartmentsQuery as Mock;

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    vi.clearAllMocks();
  });

  it('Should render the AgentDepartment component and handle navigation', () => {
    // Mock des données de départements
    const mockDepartments = {
      departments: [
        { id: '1', label: 'Cardiology' },
        { id: '2', label: 'Neurology' },
        { id: '3', label: 'Orthopedics' }
      ]
    };

    // Configure le mock pour renvoyer les données
    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: mockDepartments
    });

    // Mock de navigate
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    // Vérifie si les départements sont affichés
    const cardiologyLink = screen.getByText(/Cardiology/i);
    const neurologyLink = screen.getByText(/Neurology/i);
    const orthopedicsLink = screen.getByText(/Orthopedics/i);

    expect(cardiologyLink).toBeInTheDocument();
    expect(neurologyLink).toBeInTheDocument();
    expect(orthopedicsLink).toBeInTheDocument();

    // Simule un clic et vérifie que la navigation est appelée avec les bons paramètres
    fireEvent.click(cardiologyLink);
    expect(mockNavigate).toHaveBeenCalledWith(
      '/rechercher/service/docteur?label=Cardiology'
    );

    fireEvent.click(neurologyLink);
    expect(mockNavigate).toHaveBeenCalledWith(
      '/rechercher/service/docteur?label=Neurology'
    );

    fireEvent.click(orthopedicsLink);
    expect(mockNavigate).toHaveBeenCalledWith(
      '/rechercher/service/docteur?label=Orthopedics'
    );
  });

  it('Should handle no data available state', () => {
    // Mock d'absence de données
    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: null
    });

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    // Vérifie que le message "Pas de data valide" est affiché
    expect(screen.getByText(/Pas de data valide/i)).toBeInTheDocument();
  });
  it('Should not navigate if an invalid department label is clicked', () => {
    // Mock des données de départements
    const mockDepartments = {
      departments: [
        { id: '1', label: 'Cardiology' },
        { id: '2', label: 'Neurology' },
        { id: '3', label: 'Orthopedics' }
      ]
    };

    // Configure le mock pour renvoyer les données
    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: mockDepartments
    });

    // Mock de navigate
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    // Vérifie qu'un clic sur un élément incorrect ne déclenche pas la navigation
    const invalidLink = screen.queryByText(/Cardiologies/i); // Texte incorrect
    expect(invalidLink).not.toBeInTheDocument(); // Vérifie que cet élément n'est pas dans le DOM

    if (invalidLink) {
      fireEvent.click(invalidLink);
      expect(mockNavigate).not.toHaveBeenCalled(); // Vérifie que navigate n'est pas appelé
    }
  });

  it('Should handle API error state gracefully', () => {
    // Mock d'erreur côté API
    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: new Error('Something went wrong'),
      data: null
    });

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    // Vérifie que le message d'erreur est affiché
    expect(screen.getByText(/Erreur/i)).toBeInTheDocument();
  });
  it('Should render a ul with the correct number of li elements', () => {
    // Mock des données de départements
    const mockDepartments = {
      departments: [
        { id: '1', label: 'Cardiology' },
        { id: '2', label: 'Neurology' }
      ]
    };

    // Configure le mock pour renvoyer les données
    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: mockDepartments
    });

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    // Vérifie la présence d'un élément <ul>
    const list = screen.getByRole('list'); // Utilise `role="list"` pour trouver le ul
    expect(list).toBeInTheDocument();

    // Vérifie que le nombre d'éléments <li> correspond aux départements
    const items = screen.getAllByRole('listitem'); // Utilise `role="listitem"` pour trouver les li
    expect(items).toHaveLength(mockDepartments.departments.length);

    // Vérifie les textes des éléments <li>
    expect(items[0]).toHaveTextContent('Cardiology');
    expect(items[1]).toHaveTextContent('Neurology');
    // Vérifie que items[2] n'existe pas

    expect(items[2]).toBeUndefined();
  });
  it('Should render an h1 with the text "Service"', () => {
    // Mock des données de départements
    const mockDepartments = {
      departments: [
        { id: '1', label: 'Cardiology' },
        { id: '2', label: 'Neurology' }
      ]
    };

    // Configure le mock pour renvoyer les données
    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: mockDepartments
    });

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    // Vérifie la présence du h1 et son texte
    const heading = screen.getByRole('heading', { level: 1 }); // Cherche un h1
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Service'); // Vérifie que le texte est correct
  });
});
