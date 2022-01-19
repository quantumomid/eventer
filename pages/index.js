import { Fragment } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../firebase/utils";
import PageHeadData from "../components/head/PageHeadData";

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
            <PageHeadData />
            <h1>Welcome to Next Events</h1>
            <EventList items={featuredEvents} />
        </Fragment>
    )
}

export default HomePage;