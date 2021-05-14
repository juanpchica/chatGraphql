import React from "react";
import { Route, Router } from "react-router";
import { useAuthState } from "../context/auth";

const DynamicRouter = (props) => {
  const { user } = useAuthState();
  if (!user) {
    Router.push("/login");
  }

  return (
    <Route exact={props.exact} path={props.path} component={props.component} />
  );
};

export default DynamicRouter;
