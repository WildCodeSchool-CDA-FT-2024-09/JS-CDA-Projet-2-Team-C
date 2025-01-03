import React, { useState } from 'react';
import LoginDevButtons from './LoginDevButtons';
import Logo from '/images/logo-main-black.png';
import { useLogin } from '../../contexts/auth/useLogin';

export default function Login() {
  const { handleLogin, loginErrorMsg } = useLogin();

  // Controlled state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-80 flex-col place-items-center place-self-center"
    >
      <h1 className="text-center font-medium">Agenda Médical</h1>
      <section className="flex w-full flex-col place-items-center gap-4">
        <img className="place-self-center" src={Logo} alt="Logo" />
        <h2 className="text-center">Connexion</h2>
        <p className="text-balance text-center">
          Veuillez rentrer vos informations de connexion
        </p>

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

        <button type="submit" className="btn w-40 bg-primary">
          CONNEXION
        </button>

        {loginErrorMsg && (
          <p className="text-center text-red-500">{loginErrorMsg}</p>
        )}
        <LoginDevButtons />
      </section>
    </form>
  );
}
