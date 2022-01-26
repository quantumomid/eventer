import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import Head from "next/head";
import Notification from '../components/ui/Notification';
import { NotificationContextProvider } from '../store/notificationContext';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
        <Notification title="test" message="This is a test" status="pending" />
      </Layout>  
    </NotificationContextProvider>
  )
}

export default MyApp;
