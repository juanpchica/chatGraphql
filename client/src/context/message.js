import { createContext, useReducer, useContext } from "react";

//Create context to use the reduce in all app
const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReduce = (state, action) => {
  let usersCopy;
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_USER_MESSAGES":
      const { username, messages } = action.payload;
      usersCopy = [...state.users];

      const userIndex = usersCopy.findIndex((u) => u.username === username);

      usersCopy[userIndex] = { ...usersCopy[userIndex], messages };

      return {
        ...state,
        users: usersCopy,
      };
    case "SET_SELECTED_USER":
      usersCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));

      return {
        ...state,
        users: usersCopy,
      };
    default:
      throw new Error("Action type doesnt exist");
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReduce, { users: null });
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
