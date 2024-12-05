import { useAuth } from '../../contexts/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { roleLandingPages } from './roleLandingPages';

// This component is used to simulate login for different users roles.
// It is used in the Login page for development purposes.
// To be removed once the full auth / login process is implemented.

export default function LoginDevButtons() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = (role: 'agent' | 'secretary' | 'doctor' | 'admin') => {
    setUser({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@test.com',
      role: {
        id: 1,
        label: role
      },
      isArchived: false
    });
    navigate(roleLandingPages[role]);
  };

  return (
    <>
      <button
        onClick={() => handleLogin('agent')}
        className="btn w-40 bg-primary"
      >
        Login Agent
      </button>
      <button
        onClick={() => handleLogin('secretary')}
        className="btn w-40 bg-primary"
      >
        Login Secretary
      </button>
      <button
        onClick={() => handleLogin('doctor')}
        className="btn w-40 bg-primary"
      >
        Login Doctor
      </button>
      <button
        onClick={() => handleLogin('admin')}
        className="btn w-40 bg-primary"
      >
        Login Admin
      </button>
    </>
  );
}
