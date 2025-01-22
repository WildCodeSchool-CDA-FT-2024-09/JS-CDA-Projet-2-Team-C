import { useAuth } from '../../../contexts/auth/useAuth';
import { RoleCode } from '../../../generated/graphql-types';
import DoctorHome from '../../../pages/DoctorHome/DoctorHome';
import SecretaryHome from '../../../pages/SecretaryHome/SecretaryHome';

export default function RoleBasedPlanning() {
  const { user } = useAuth();

  switch (user?.role.code) {
    case RoleCode.Doctor:
      return <DoctorHome />;

    case RoleCode.Secretary:
      return <SecretaryHome />;
  }
}
