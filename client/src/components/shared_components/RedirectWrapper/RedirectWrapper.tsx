import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../../contexts/auth/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../../contexts/toasts/useToast';
import { roleLandingPages } from '../../../pages/Login/roleLandingPages';

const RedirectWrapper = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authChecked } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    // Don't redirect until auth is checked
    if (!authChecked) return;

    // If user not logged in, redirect to login page
    if (!user) {
      navigate('/');
    } else if (location.pathname === '/') {
      // If user logged in, redirect root to appropriate landing page. This prevents the user from returning to the login page if they are already logged in, including through browser back button.
      navigate(
        roleLandingPages[user.role.code as keyof typeof roleLandingPages],
        { replace: true }
      );
      showToast(`Welcome back ${user.email}`, 'success');
    }
  }, [authChecked, user, navigate, location.pathname]);

  // Remove fragments
  return <>{children}</>;
};

export default RedirectWrapper;
