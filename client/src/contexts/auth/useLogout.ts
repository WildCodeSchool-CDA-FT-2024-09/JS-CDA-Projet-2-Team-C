import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useLogoutMutation } from '../../generated/graphql-types';
import { useToast } from '../toasts/useToast';

export function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [logoutMutation, { error }] = useLogoutMutation();
  const { showToast } = useToast();

  return async () => {
    // Call the server-side logout to clear the cookie
    await logoutMutation();
    // Then clear local user state and redirect
    if (!error) {
      setUser(null);
      navigate('/');
    } else {
      showToast('Something went wrong, please try again', 'error');
    }
  };
}
