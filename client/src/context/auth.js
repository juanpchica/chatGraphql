import { createContext, useReducer, useContext } from "react";
import jwtDecode from "jwt-decode";

//Create context to use the reduce in all app
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

let user = null;

//Validate if token exist and get user data from token
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (new Date() > new Date(decodedToken.exp * 1000)) {
    localStorage.removeItem("token");
  } else {
    user = decodedToken;
  }
} else {
  console.log("Not token found");
}

const authReduce = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error("Action type doesnt exist");
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReduce, { user });
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
