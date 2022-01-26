import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import Head from "next/head";
import { NotificationContextProvider } from '../store/notificationContext';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </Layout>  
    </NotificationContextProvider>
  )
}

export default MyApp;
