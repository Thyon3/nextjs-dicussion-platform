import { useAtom } from "jotai";
import { userStateAtom } from "@/atoms/userAtom";
import { useState } from "react";
import { getCurrentUser, logout as logoutApi, login as loginApi, register as signupApi } from "@/lib/api/auth";

export const useAuth = () => {
  const [userState, setUserState] = useAtom(userStateAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    setUserState((prev) => ({ ...prev, loading: true }));
    try {
      const user = await getCurrentUser();
      setUserState({ user, loading: false });
    } catch (error) {
      setUserState({ user: null, loading: false });
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await loginApi({ email, password });
      await checkAuth();
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await signupApi({ email, password, displayName });
      await checkAuth();
    } catch (err: any) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUserState({ user: null, loading: false });
  };

  return {
    user: userState.user,
    loading: userState.loading || isLoading,
    isLoading,
    error,
    checkAuth,
    login,
    signup,
    logout,
  };
};

// Compatibility hook to mimic useAuthState(auth)
export const useAuthState = () => {
  const [userState] = useAtom(userStateAtom);
  return [userState.user, userState.loading];
};

