import { createContext, PropsWithChildren, useState } from 'react';
import { AuthUser } from '../../generated/graphql-types';
import { AuthContextType } from './AuthContext.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
