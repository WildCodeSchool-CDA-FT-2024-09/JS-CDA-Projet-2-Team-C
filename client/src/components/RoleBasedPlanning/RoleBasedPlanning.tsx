// import { useAuth } from '../../contexts/auth/useAuth';
import { RoleLabel } from '../../generated/graphql-types';
import SecretaryHome from '../../pages/SecretaryHome/SecretaryHome';

export default function RoleBasedPlanning() {
  // const { user } = useAuth();

  // const label = user?.role.label;

  const label: RoleLabel[number] = 'SECRETARY';

  switch (label) {
    case 'DOCTOR':
      return (
        <h3 className="flex h-24 place-content-center place-items-center text-center">
          [contenu du planning médecin]
        </h3>
      );

    case 'SECRETARY':
      return <SecretaryHome />;

    case 'AGENT':
      return (
        <h3 className="flex h-24 place-content-center place-items-center text-center">
          [page non accessible]
        </h3>
      );

    default:
      return (
        <h3 className="flex h-24 place-content-center place-items-center text-center">
          [page non accessible]
        </h3>
      );
  }
}
