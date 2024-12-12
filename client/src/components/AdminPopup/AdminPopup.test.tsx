import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AdminPopup } from './AdminPopup';
import {
  useDepartmentsQuery,
  useGendersQuery,
  useAddUserMutation
} from '../../generated/graphql-types';

vi.mock('../../generated/graphql-types', async () => {
  const actual = await vi.importActual('../../generated/graphql-types');
  return {
    ...actual,
    useDepartmentsQuery: vi.fn(),
    useGendersQuery: vi.fn(),
    useAddUserMutation: vi.fn()
  };
});

describe('AdminPopup', () => {
  beforeEach(() => {
    vi.mocked(useDepartmentsQuery).mockReturnValue({
      data: { departments: [{ id: '1', label: 'Orthoptie' }] }
    });
    vi.mocked(useGendersQuery).mockReturnValue({
      data: {
        genders: [
          { id: '1', label: 'Homme' },
          { id: '2', label: 'Femme' }
        ]
      }
    });
    vi.mocked(useAddUserMutation).mockReturnValue([
      vi.fn(() => Promise.resolve({ data: {} }))
    ]);
  });

  it('should render without errors', () => {
    render(<AdminPopup />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    dialog.setAttribute('open', '');
    expect(screen.getByText('Créer un utilisateur')).toBeInTheDocument();
  });

  it('should disable the submit button initially', () => {
    render(<AdminPopup />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    dialog.setAttribute('open', '');

    const submitButton = screen.getByRole('button', {
      name: /ajouter un utilisateur/i
    });
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button when all required fields are filled for a role', async () => {
    render(<AdminPopup />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    dialog.setAttribute('open', '');

    // Select a role
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: 'doctor' }
    });

    // Select required fields
    fireEvent.change(screen.getByPlaceholderText(/dupont/i), {
      target: { value: 'Convergence' }
    });
    fireEvent.change(screen.getByPlaceholderText(/jean/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText(/email@adresse\.com/i), {
      target: { value: 'dr.convergence@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/service/i), {
      target: { value: 'Orthoptie' }
    });
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: 'Homme' }
    });

    // Check button activation
    const submitButton = screen.getByRole('button', {
      name: /ajouter un utilisateur/i
    });
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

  it('should display error messages when the form submission fails', async () => {
    vi.mocked(useAddUserMutation).mockReturnValue([
      vi.fn(() =>
        Promise.reject({
          graphQLErrors: [{ message: 'Email déjà utilisé' }]
        })
      )
    ]);

    render(<AdminPopup />);
    const dialog = screen.getByRole('dialog', { hidden: true });
    dialog.setAttribute('open', '');

    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: 'doctor' }
    });
    fireEvent.change(screen.getByPlaceholderText(/dupont/i), {
      target: { value: 'Convergence' }
    });
    fireEvent.change(screen.getByPlaceholderText(/jean/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText(/email@adresse\.com/i), {
      target: { value: 'dr.convergence@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/service/i), {
      target: { value: 'Orthoptie' }
    });
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: 'Homme' }
    });

    const submitButton = screen.getByRole('button', {
      name: /ajouter un utilisateur/i
    });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(screen.getByText(/email déjà utilisé/i)).toBeInTheDocument()
    );
  });

  it('should reset form after successful submission', async () => {
    render(<AdminPopup />);
    const dialog = screen.getByRole('dialog', { hidden: true });

    dialog.setAttribute('open', '');

    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: 'doctor' }
    });
    fireEvent.change(screen.getByPlaceholderText(/dupont/i), {
      target: { value: 'Convergence' }
    });
    fireEvent.change(screen.getByPlaceholderText(/jean/i), {
      target: { value: 'John' }
    });
    fireEvent.change(screen.getByPlaceholderText(/email@adresse\.com/i), {
      target: { value: 'dr.convergence@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/service/i), {
      target: { value: 'Orthoptie' }
    });
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: 'Homme' }
    });

    const submitButton = screen.getByRole('button', {
      name: /ajouter un utilisateur/i
    });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByLabelText(/role/i)).toHaveValue(''));

    dialog.removeAttribute('open');

    await waitFor(() => expect(dialog.hasAttribute('open')).toBe(false));
  });
});
