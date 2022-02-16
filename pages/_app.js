import Layout from "../components/layout/Layout"
import "../styles/globals.css"
import Head from "next/head";
import { NotificationContextProvider } from "../store/NotificationContext";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Provider session={pageProps.session}>
        <Layout>
          <Head>
            <title>Eventer</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Component {...pageProps} />
        </Layout>  
      </Provider>
    </NotificationContextProvider>
  )
}

export default MyApp;
