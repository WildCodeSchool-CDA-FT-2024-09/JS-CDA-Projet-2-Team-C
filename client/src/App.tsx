import { useRolesQuery } from './generated/graphql-types';
import Logo from '../public/images/logo-main-black.png';

export default function App() {
  const { loading } = useRolesQuery();

  if (loading) return <div>loading</div>;

  return (
    <section className="flex w-80 flex-col place-items-center place-self-center">
      <h1 className="text-center text-4xl font-medium">Agenda Médical</h1>
      <section className="flex w-full flex-col place-items-center gap-4">
        <img className="place-self-center" src={Logo} />
        <h2 className="text-center text-4xl">Connexion</h2>
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
        <button className="btn w-40 bg-primary">CONNEXION</button>
      </section>
    </section>
  );
}
