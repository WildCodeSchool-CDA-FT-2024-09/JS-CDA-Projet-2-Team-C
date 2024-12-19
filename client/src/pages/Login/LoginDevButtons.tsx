import { useAuth } from '../../contexts/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { roleLandingPages } from './roleLandingPages';
import { RoleCode } from '../../generated/graphql-types';

// This component is used to simulate login for different users roles.
// It is used in the Login page for development purposes.
// To be removed once the full auth / login process is implemented.

export default function LoginDevButtons() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = (role: RoleCode) => {
    setUser({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@test.com',
      role: {
        id: 1,
        label: role,
        code: role
      },
      isArchived: false
    });

    setTimeout(() => {
      navigate(roleLandingPages[role]);
    }, 100);
  };

  return (
    <>
      <button
        onClick={() => handleLogin(RoleCode.Agent)}
        className="btn w-40 bg-primary"
      >
        Login Agent
      </button>
      <button
        onClick={() => handleLogin(RoleCode.Secretary)}
        className="btn w-40 bg-primary"
      >
        Login Secretary
      </button>
      <button
        onClick={() => handleLogin(RoleCode.Doctor)}
        className="btn w-40 bg-primary"
      >
        Login Doctor
      </button>
      <button
        onClick={() => handleLogin(RoleCode.Admin)}
        className="btn w-40 bg-primary"
      >
        Login Admin
      </button>
    </>
  );
}
