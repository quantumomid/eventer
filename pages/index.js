import { Fragment } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummyData";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();
    return (
        <Fragment>
            <h1>Welcome to Omid's blog</h1>
            <EventList items={featuredEvents} />
        </Fragment>
    )
}

export default HomePage;