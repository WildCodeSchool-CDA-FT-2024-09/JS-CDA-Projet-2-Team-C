import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import {
  AuthUser,
  useGetCurrentAuthUserLazyQuery
} from '../../generated/graphql-types';
import { AuthContextType } from './AuthContext.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [getCurrentUser, { data, error }] = useGetCurrentAuthUserLazyQuery();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    if (data?.getCurrentAuthUser) {
      setUser(data.getCurrentAuthUser);
    }
    if (data || error) {
      setAuthChecked(true);
    }
  }, [data, error]);

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
