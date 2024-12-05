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
      '/rechercher/service/Cardiology?label=Cardiology'
    );

    fireEvent.click(neurologyLink);
    expect(mockNavigate).toHaveBeenCalledWith(
      '/rechercher/service/Neurology?label=Neurology'
    );

    fireEvent.click(orthopedicsLink);
    expect(mockNavigate).toHaveBeenCalledWith(
      '/rechercher/service/Orthopedics?label=Orthopedics'
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

    // Vérifie que le message "No data available" est affiché
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});
