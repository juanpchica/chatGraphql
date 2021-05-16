import { Container } from "react-bootstrap";
import ApolloProvide from "./ApolloProvider";
import { BrowserRouter, Switch } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.scss";
import { AuthProvider } from "./context/auth";
import DynamicRouter from "./util/DynamicRouter";

function App() {
  return (
    <ApolloProvide>
      <AuthProvider>
        <Container className='pt-5'>
          <BrowserRouter>
            <Container className='pt-5'>
              <Switch>
                <DynamicRouter exact path='/' component={Home} authenticated />
                <DynamicRouter path='/register' component={Register} guest />
                <DynamicRouter path='/login' component={Login} guest />
              </Switch>
            </Container>
          </BrowserRouter>
        </Container>
      </AuthProvider>
    </ApolloProvide>
  );
}

export default App;
