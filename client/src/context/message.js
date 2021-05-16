import { createContext, useReducer, useContext } from "react";

//Create context to use the reduce in all app
const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReduce = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
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
