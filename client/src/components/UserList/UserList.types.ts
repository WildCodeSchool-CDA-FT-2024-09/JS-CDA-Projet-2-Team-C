interface UserProps {
  id: number;
  role: 'doctor' | 'agent' | 'secretary' | 'admin';
  name: string;
  lastName: string;
  email: string;
}

export default UserProps;
