import { PropsWithChildren } from 'react';
import { useAuth } from '../../../contexts/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { roleLandingPages } from '../../../pages/Login/roleLandingPages';

export default function ProtectedRoute({
  allowedRoles,
  children
}: PropsWithChildren<{ allowedRoles: string[] }>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  if (!allowedRoles.includes(user.role.code)) {
    navigate(
      roleLandingPages[user.role.code as keyof typeof roleLandingPages],
      { replace: true }
    );
  }

  return <>{children}</>;
}
