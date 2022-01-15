import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { applyVar } from "../src/store/apply";

function MyApp({ Component, pageProps }: AppProps) {

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getLoading: {
            read() {
              return applyVar()
            }
          }
        }
      }
    }
  })

  const client = new ApolloClient({
    uri: '/api/graphql',
    cache
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
