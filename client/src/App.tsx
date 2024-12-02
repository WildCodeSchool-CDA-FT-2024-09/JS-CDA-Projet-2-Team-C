import { useRolesWithUsersQuery } from './generated/graphql-types';

export default function App() {
  const { loading, data } = useRolesWithUsersQuery();

  if (loading) return <div>loading</div>;

  return (
    <>
      <h1 className="text-3xl font-bold underline">This is Chocolateam</h1>
      {data?.roles.map((role) => (
        <div key={role.id}>
          <h2>{role.label}</h2>
        </div>
      ))}
    </>
  );
}
