import React, { useState } from 'react';
import Logo from '/images/logo-main-black.png';
import { useLogin } from '../../contexts/auth/useLogin';
import { useAuth } from '../../contexts/auth/useAuth';

export default function Login() {
  const { user, authChecked } = useAuth();
  const { handleLogin, loginErrorMsg } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  if (!authChecked || user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-80 flex-col place-items-center place-self-center"
    >
      <h1 className="text-center font-medium">Agenda Médical</h1>
      <section className="mt-[12vh] flex w-full flex-col place-items-center gap-4">
        <img className="place-self-center" src={Logo} alt="Logo" />
        <h2 className="text-center">Connexion</h2>

        <div className="w-full max-w-xs">
          <label
            htmlFor="password"
            className="form-control block text-sm font-medium"
          >
            <div className="label">
              <span className="label-text text-primary">Email</span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ..."
              className="input input-bordered input-primary w-full rounded-full"
            />
          </label>
        </div>

        <div className="w-full max-w-xs">
          <label
            htmlFor="password"
            className="form-control block text-sm font-medium"
          >
            <div className="label">
              <span className="label-text text-primary">Mot de Passe</span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe ..."
              className="input input-bordered input-primary w-full rounded-full"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 h-12 w-40 rounded-lg bg-primary p-2 text-white hover:bg-primary-dark"
        >
          CONNEXION
        </button>

        {loginErrorMsg && (
          <p className="text-center text-red-500">{loginErrorMsg}</p>
        )}
      </section>
    </form>
  );
}
