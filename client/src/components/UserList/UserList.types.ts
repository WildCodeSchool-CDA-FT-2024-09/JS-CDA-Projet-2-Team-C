interface UserProps {
  id: number;
  role: 'medecin' | 'agent' | 'secretaire' | 'admin'; // Rôle limité aux valeurs possibles
  name: string;
  lastName: string;
  email: string;
}

export default UserProps;
