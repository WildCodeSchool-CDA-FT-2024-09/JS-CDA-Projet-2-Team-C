interface UserProps {
  id: number;
  role: 'doctor' | 'agent' | 'secretary' | 'admin'; // Rôle limité aux valeurs possibles
  name: string;
  lastName: string;
  email: string;
}

export default UserProps;
