import { createContext, Dispatch, SetStateAction, ReactNode } from "react";
import { User } from "../generated/gql/graphql";
import usePersistedState from "use-persisted-state-hook";

//context to access user globally
export type CurrentUser = Pick<User, "username" | "role" | "userDep">;
type AuthUserContext = {
  currentUser: CurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
};

export const AuthContext = createContext<AuthUserContext>(
  {} as AuthUserContext
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = usePersistedState<CurrentUser | null>(
    "user",
    null
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
