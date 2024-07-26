import { User } from "../generated/gql/graphql";

//interface for auth 
interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
  }
  

  
  interface LoginSuccessAction {
    type: 'LOGIN_SUCCESS';
    payload: {
      user: User;
      accessToken: string;
    };
  }
  
  interface LogoutAction {
    type: 'LOGOUT';
  }
  
  type AuthAction = LoginSuccessAction | LogoutAction;
  
  const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
  };
  
  const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  