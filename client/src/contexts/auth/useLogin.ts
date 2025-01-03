import { useAuth } from './useAuth';
import { useLoginLazyQuery } from '../../generated/graphql-types';

export const useLogin = () => {
  const { setUser } = useAuth();
  const [login, { error: loginError }] = useLoginLazyQuery();

  const handleLogin = async (email: string, password: string) => {
    const response = await login({ variables: { email, password } });
    if (response.data?.login) {
      setUser(response.data.login);
    }
  };

  return {
    handleLogin,
    loginErrorMsg: loginError?.message || null
  };
};
