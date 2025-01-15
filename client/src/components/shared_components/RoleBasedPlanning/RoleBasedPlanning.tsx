import { useAuth } from '../../../contexts/auth/useAuth';
import { RoleCode } from '../../../generated/graphql-types';
import SecretaryHome from '../../../pages/SecretaryHome/SecretaryHome';

export default function RoleBasedPlanning() {
  const { user } = useAuth();

  switch (user?.role.code) {
    case RoleCode.Doctor:
      return (
        <h3 className="flex h-24 place-content-center place-items-center text-center">
          [contenu du planning médecin]
        </h3>
      );

    case RoleCode.Secretary:
      return <SecretaryHome />;
  }
}
