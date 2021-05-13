import { Container } from "react-bootstrap";
import ApolloProvide from "./ApolloProvider";
import "./App.scss";
import Register from "./pages/Register";

function App() {
  return (
    <ApolloProvide>
      <Container className='pt-5'>
        <Register />
      </Container>
    </ApolloProvide>
  );
}

export default App;
