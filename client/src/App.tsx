import { useRolesQuery } from './generated/graphql-types';

import Logo from '../public/images/logo-agenda-medical-noir.png';

export default function App() {
  const { loading } = useRolesQuery();

  if (loading) return <div>loading</div>;

  return (
    <section className="self-center">
      <h1 className="text-center text-4xl font-medium">Agenda Médical</h1>
      <img className="place-self-center" src={Logo} />
      <h2 className="text-center text-4xl">Connexion</h2>
    </section>
  );
}
