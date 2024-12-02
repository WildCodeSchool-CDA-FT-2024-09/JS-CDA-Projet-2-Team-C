import { useRolesQuery } from './generated/graphql-types';
import CreateEventWithNoOverlap from './components/Calendar/SecretaryCalendar';

export default function App() {
  const { loading, data } = useRolesQuery();

  if (loading) return <div>loading</div>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">This is Chocolateam</h1>
      {data?.roles}
      <CreateEventWithNoOverlap />
    </>
  );
}
