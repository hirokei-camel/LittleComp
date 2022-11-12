import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { graphqlClient } from '../lib/apollo-client';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LittleComp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <ApolloProvider client={graphqlClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
