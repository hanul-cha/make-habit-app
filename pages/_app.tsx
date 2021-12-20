import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css"
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

function MyApp({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache
  });
  
  return (
    <>
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
