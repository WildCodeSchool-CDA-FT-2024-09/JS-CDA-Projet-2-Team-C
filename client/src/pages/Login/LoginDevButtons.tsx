import { useAuth } from '../../contexts/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { roleLandingPages } from './roleLandingPages';
import { RoleLabel } from '../../generated/graphql-types';

// This component is used to simulate login for different users roles.
// It is used in the Login page for development purposes.
// To be removed once the full auth / login process is implemented.

export default function LoginDevButtons() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = (role: RoleLabel) => {
    setUser({
      id: 1,
      email: 'test@test.com',
      role: {
        id: 1,
        label: role
      },
      token: 'test-token'
    });

    setTimeout(() => {
      navigate(roleLandingPages[role]);
    }, 100); // Petit délai pour laisser le contexte se mettre à jour
  };

  return (
    <>
      <button
        onClick={() => handleLogin(RoleLabel.Agent)}
        className="btn w-40 bg-primary"
      >
        Login Agent
      </button>
      <button
        onClick={() => handleLogin(RoleLabel.Secretary)}
        className="btn w-40 bg-primary"
      >
        Login Secretary
      </button>
      <button
        onClick={() => handleLogin(RoleLabel.Doctor)}
        className="btn w-40 bg-primary"
      >
        Login Doctor
      </button>
      <button
        onClick={() => handleLogin(RoleLabel.Admin)}
        className="btn w-40 bg-primary"
      >
        Login Admin
      </button>
    </>
  );
}
