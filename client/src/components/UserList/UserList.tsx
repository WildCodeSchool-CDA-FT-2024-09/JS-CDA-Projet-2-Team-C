import { useGetAllUsersQuery } from '../../generated/graphql-types';

export default function UserList({
  currentPage,
  perPage,
  role,
  debouncedSearch,
  onPaginationData
}: {
  currentPage: number;
  perPage: number;
  role: string;
  debouncedSearch: string;
  onPaginationData: (total: number, hasMoreData: boolean) => void;
}) {
  const { data, loading, error } = useGetAllUsersQuery({
    variables: {
      skip: currentPage * perPage,
      take: perPage,
      roleCode: role || null,
      searchByName: debouncedSearch || null
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (fetchedData) => {
      const total = fetchedData?.getAllUsers?.total || 0;
      const hasMoreData = fetchedData?.getAllUsers?.hasMore || false;
      onPaginationData(total, hasMoreData);
    }
  });

  if (loading)
    return (
      <tr>
        <td colSpan={5}>Chargement...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td colSpan={5}>Erreur : Veuillez recharger la page</td>
      </tr>
    );

  const users = data?.getAllUsers.users || [];

  return (
    <>
      {users.map((user) => (
        <tr key={user.id} className="border-b border-gray-300">
          <td>{user.role.label}</td>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td className="flex gap-2">
            <button
              type="button"
              className="m-0 inline-flex items-center gap-2 rounded-lg bg-primary-light p-2 hover:bg-primary-dark hover:text-white"
            >
              Modifier
            </button>
            <button
              type="button"
              className="m-0 inline-flex items-center gap-2 rounded-lg bg-danger-lighter p-2 hover:bg-danger-dark hover:text-white"
            >
              Archiver
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
