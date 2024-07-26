
import { useAppSelector } from "./redux/hooks";

//so that we don't redefine this everywhere
export const AuthAndUserRoles = () => {
  const user = useAppSelector((state) => state.user);
  const userRoles = {
    defaultUser: user?.role === "USER",
    adminUser: user?.role === "ADMIN",
    rootUser: user?.role === "ROOT",
    adminOrRootUser: user?.role === "ROOT" || user?.role === "ADMIN",
  }
  return {
    auth: user,
    userRoles
  };
};

