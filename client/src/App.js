import { Container } from "react-bootstrap";
import ApolloProvide from "./ApolloProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.scss";

function App() {
  return (
    <ApolloProvide>
      <Container className='pt-5'>
        <BrowserRouter>
          <Container className='pt-5'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
            </Switch>
          </Container>
        </BrowserRouter>
      </Container>
    </ApolloProvide>
  );
}

export default App;
