import { getAllEvents } from "../../dummyData";
import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import EventsSearch from "../../components/events/EventsSearch";

const EventsPage = () => {

    const events = getAllEvents();
    // console.log(events);

    return (
        <Fragment>
            <EventsSearch />
            <EventList items={events} />
        </Fragment>
    )
}

export default EventsPage;