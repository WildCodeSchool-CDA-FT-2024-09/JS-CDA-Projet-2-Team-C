import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../../../contexts/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { roleLandingPages } from '../../../pages/Login/roleLandingPages';

export default function ProtectedRoute({
  allowedRoles,
  children
}: PropsWithChildren<{ allowedRoles: string[] }>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!allowedRoles.includes(user.role.code)) {
      navigate(
        roleLandingPages[user.role.code as keyof typeof roleLandingPages],
        { replace: true }
      );
    }
  }, [user, allowedRoles, navigate]);

  // Only render children if the user is authenticated and has the appropriate role
  if (!user || !allowedRoles.includes(user.role.code)) {
    return null;
  }

  return <>{children}</>;
}
