import { screen, render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import AgentDepartment from './AgentDepartment';
import { useDepartmentsQuery } from '../../generated/graphql-types';

vi.mock('../../generated/graphql-types', () => ({
  useDepartmentsQuery: vi.fn()
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn())
  };
});

describe('Test AgentDepartment component', () => {
  const mockNavigate = vi.fn();
  const mockUseDepartmentsQuery = useDepartmentsQuery as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should render the AgentDepartment component and handle navigation', () => {
    const mockDepartments = {
      departments: [
        { id: '1', label: 'Cardiology' },
        { id: '2', label: 'Neurology' },
        { id: '3', label: 'Orthopedics' }
      ]
    };

    mockUseDepartmentsQuery.mockReturnValue({
      loading: false,
      error: null,
      data: mockDepartments
    });

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <AgentDepartment />
      </MemoryRouter>
    );

    const cardiologyLink = screen.getByText(/Cardiology/i);
    const neurologyLink = screen.getByText(/Neurology/i);
    const orthopedicsLink = screen.getByText(/Orthopedics/i);

    expect(cardiologyLink).toBeInTheDocument();
    expect(neurologyLink).toBeInTheDocument();
    expect(orthopedicsLink).toBeInTheDocument();

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

    expect(screen.getByText(/Pas de data valide/i)).toBeInTheDocument();
  });

  it('Should handle API error state gracefully', () => {
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

    expect(screen.getByText(/Erreur/i)).toBeInTheDocument();
  });

  it('Should render an h1 with the text "Service"', () => {
    const mockDepartments = {
      departments: [
        { id: '1', label: 'Cardiology' },
        { id: '2', label: 'Neurology' }
      ]
    };

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

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Service');
  });
});
