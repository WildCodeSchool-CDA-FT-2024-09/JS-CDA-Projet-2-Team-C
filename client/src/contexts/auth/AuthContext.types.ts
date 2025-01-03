import { AuthUser } from '../../generated/graphql-types';

export type AuthContextType = {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};
