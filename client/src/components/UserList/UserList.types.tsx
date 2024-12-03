interface UserProps {
  id: number;
  role: 'médecin' | 'agent' | 'secrétaire' | 'admin'; // Rôle limité aux valeurs possibles
  name: string;
  lastName: string;
  email: string;
}

export default UserProps;
