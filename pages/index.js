import { Fragment } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../firebase/utils";

export const getStaticProps = async() => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents
        }
    }
}

const HomePage = ({ featuredEvents }) => {
    if(!featuredEvents) return <p>Loading....</p>
    return (
        <Fragment>
            <h1>Welcome to Omid's blog</h1>
            <EventList items={featuredEvents} />
        </Fragment>
    )
}

export default HomePage;