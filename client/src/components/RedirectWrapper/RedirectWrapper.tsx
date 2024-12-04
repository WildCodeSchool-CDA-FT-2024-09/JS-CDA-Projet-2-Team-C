import { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../../contexts/user/useUser';
import { useNavigate, useLocation } from 'react-router-dom';
import { roleLandingPages } from '../../pages/Login/roleLandingPages';

const RedirectWrapper = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    // If user not logged in, redirect to login page
    if (!user) {
      navigate('/');
    } else if (location.pathname === '/') {
      // If user logged in, redirect root to appropriate landing page. This prevents the user from returning to the login page if they are already logged in, including through browser back button.
      navigate(
        roleLandingPages[user.role.label as keyof typeof roleLandingPages],
        { replace: true }
      );
    }
  }, [user, navigate, location.pathname]);

  return <>{children}</>;
};

export default RedirectWrapper;
