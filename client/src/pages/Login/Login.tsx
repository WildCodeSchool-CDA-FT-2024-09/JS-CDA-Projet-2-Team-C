import { useAuth } from '../../contexts/auth/useAuth';
import Logo from '/images/logo-main-black.png';
import { useNavigate } from 'react-router-dom';
import { roleLandingPages } from './roleLandingPages';

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogin = (role: 'agent' | 'secretary' | 'doctor' | 'admin') => {
    setUser({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@test.com',
      role: {
        id: 1,
        label: role
      }
    });
    navigate(roleLandingPages[role]);
  };

  return (
    <section className="flex w-80 flex-col place-items-center place-self-center">
      <h1 className="text-center font-medium">
        Agenda Médical {user?.role.label}
      </h1>
      <section className="flex w-full flex-col place-items-center gap-4">
        <img className="place-self-center" src={Logo} />
        <h2 className="text-center">Connexion</h2>
        <p className="text-balance text-center">
          Veuillez rentrer vos informations de connexion
        </p>
        <input
          type="text"
          placeholder="Email ..."
          className="input input-bordered input-primary w-full max-w-xs rounded-full"
        />
        <input
          type="text"
          placeholder="Mot de passe ..."
          className="input input-bordered input-primary w-full max-w-xs rounded-full"
        />
        <button disabled className="btn w-40 bg-primary">
          CONNEXION
        </button>
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
      </section>
    </section>
  );
}
