import { createContext, useReducer, useContext } from "react";

//Create context to use the reduce in all app
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReduce = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      throw new Error("Action type doesnt exist");
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReduce, { user: null });
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
