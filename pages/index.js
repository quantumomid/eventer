import { Fragment } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../firebase/utils";
import Head from "next/head";

export const getStaticProps = async() => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents
        },
        revalidate: 1800
    }
}

const HomePage = ({ featuredEvents }) => {
    if(!featuredEvents) return <p>Loading....</p>
    return (
        <Fragment>
            <Head>
                <title>Next Events</title>
                <meta name="description" content="Collection of a variety of events around the world to help you develop." />
            </Head>
            <h1>Welcome to Next Events</h1>
            <EventList items={featuredEvents} />
        </Fragment>
    )
}

export default HomePage;