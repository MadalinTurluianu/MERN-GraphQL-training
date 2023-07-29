import "./index.css";
import Header from "./components/Header";
import { InMemoryCache, ApolloProvider, ApolloClient } from "@apollo/client";
import Clients from "./components/Clients";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Clients />
      <div className="container">
        <h1>Hello world</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
