import React from "react";
import { Redirect, Route } from "react-router";
import { useAuthState } from "../context/auth";

const DynamicRouter = (props) => {
  const { user } = useAuthState();

  if (props.authenticated && !user) {
    return <Redirect to='/login' />;
  } else if (props.guest && user) {
    return <Redirect to='/' />;
  } else {
    return <Route {...props} />;
  }
};

export default DynamicRouter;
