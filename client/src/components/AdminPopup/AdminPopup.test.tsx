import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithAllProviders as render } from '../../utils/test/test.utils';
import { vi } from 'vitest';
import AdminPopup from './AdminPopup';
import {
  useAddUserMutation,
  useDepartmentsAndGendersAndRolesQuery,
  useGetAllUsersQuery
} from '../../generated/graphql-types';

vi.mock('../../generated/graphql-types', async () => {
  const actual = await vi.importActual('../../generated/graphql-types');
  return {
    ...actual,
    useDepartmentsAndGendersAndRolesQuery: vi.fn(),
    useGetAllUsersQuery: vi.fn(),
    useAddUserMutation: vi.fn()
  };
});

describe('AdminPopup', () => {
  beforeEach(() => {
    vi.mocked(useDepartmentsAndGendersAndRolesQuery).mockReturnValue({
      data: {
        departments: [{ id: 1, label: 'Orthoptie' }],
        genders: [
          { id: 1, label: 'Male' },
          { id: 2, label: 'Female' }
        ],
        roles: [
          { id: 1, label: 'doctor' },
          { id: 2, label: 'agent' },
          { id: 3, label: 'secretary' },
          { id: 4, label: 'admin' }
        ]
      }
    });
    vi.mocked(useAddUserMutation).mockReturnValue([
      vi.fn(() => Promise.resolve({ data: {} }))
    ]);
  });

  it('should render without errors', () => {
    render(
      <AdminPopup
        close={vi.fn()}
        refetchUsers={vi.mocked(useGetAllUsersQuery)}
      />
    );
    const dialog = screen.getByRole('dialog', { hidden: true });
    dialog.setAttribute('open', '');
    expect(screen.getByText('Créer un utilisateur')).toBeInTheDocument();
  });

  it('should disable the submit button initially', () => {
    render(
      <AdminPopup
        close={vi.fn()}
        refetchUsers={vi.mocked(useGetAllUsersQuery)}
      />
    );
    const dialog = screen.getByRole('dialog', { hidden: true });
    dialog.setAttribute('open', '');

    const submitButton = screen.getByRole('button', {
      name: /ajouter un utilisateur/i
    });
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button when all required fields are filled for a role', async () => {
    render(
      <AdminPopup
        close={vi.fn()}
        refetchUsers={vi.mocked(useGetAllUsersQuery)}
      />
    );
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
      target: { value: 'Male' }
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

    render(
      <AdminPopup
        close={vi.fn()}
        refetchUsers={vi.mocked(useGetAllUsersQuery)}
      />
    );
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
      target: { value: 'Male' }
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
    render(
      <AdminPopup
        close={vi.fn()}
        refetchUsers={vi.mocked(useGetAllUsersQuery)}
      />
    );
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
      target: { value: 'Male' }
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
