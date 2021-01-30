import Layout from "../components/layout/Layout";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "../styles/index.scss";

const client = new ApolloClient({
  uri: "http://localhost:2137/graphql",
  cache: new InMemoryCache(),
  credentials: "include"
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
