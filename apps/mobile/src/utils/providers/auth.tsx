import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { trpc } from "@/utils/trpc/trpc";
import {
  getValueFromSecureStore,
  removeFromSecureStore,
  saveToSecureStore,
} from "@/utils/helpers/string";
import { SECURE_STORE_KEY } from "@/utils/constants";

type LoginPayload = {
  phone: string;
  password: string;
};

type AuthSession = {
  sessionId: string | undefined;
};

type AuthContextData = {
  state: "authenticated" | "unauthenticated" | "loading";
  session: AuthSession;
  login(payload: LoginPayload): Promise<void>;
  logout(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>({ sessionId: undefined });
  const [isLoading, setIsLoading] = useState(true);

  const authLogin = trpc.auth.login.useMutation({
    onSuccess: async ({ data }) => {
      setIsLoading(false);
      await saveToSecureStore(
        SECURE_STORE_KEY.SESSION_ID,
        data.session.sessionId
      );
      setSession({
        ...session,
        sessionId: data.session.sessionId,
      });
    },
    onError: async () => {
      // NOTE: Handle on login error here
      setIsLoading(false);
    },
  });

  const authLogout = trpc.auth.logout.useMutation({
    onSuccess: async () => {
      await removeFromSecureStore(SECURE_STORE_KEY.SESSION_ID);
      setSession({
        ...session,
        sessionId: undefined,
      });
      setIsLoading(false);
    },
    onError: async () => {
      // NOTE: Handle on logout error here
      setIsLoading(false);
    },
  });

  const authValidate = trpc.auth.validate.useMutation({
    onSuccess: async ({ data }) => {
      setIsLoading(false);
      await saveToSecureStore(
        SECURE_STORE_KEY.SESSION_ID,
        data.session.sessionId
      );
      setSession({
        ...session,
        sessionId: data.session.sessionId,
      });
    },
    onError: async () => {
      setIsLoading(false);
      await removeFromSecureStore(SECURE_STORE_KEY.SESSION_ID);
      setSession({
        ...session,
        sessionId: undefined,
      });
    },
  });

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    authLogin.mutate(payload);
  };

  const logout = async () => {
    setIsLoading(true);
    authLogout.mutate();
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      setIsLoading(true);
      let sessionId;

      try {
        sessionId = await getValueFromSecureStore(SECURE_STORE_KEY.SESSION_ID);
        if (sessionId) {
          authValidate.mutate();
        }
      } catch (e) {
        await removeFromSecureStore(SECURE_STORE_KEY.SESSION_ID);
        setSession({
          ...session,
          sessionId: undefined,
        });
      }
      setIsLoading(false);
    };

    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state: isLoading
          ? "loading"
          : session.sessionId
          ? "authenticated"
          : "unauthenticated",
        login,
        logout,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
