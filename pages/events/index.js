import { getAllEvents } from "../../dummyData";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import EventsSearch from "../../components/events/EventsSearch";

const EventsPage = () => {
    const router = useRouter();
    const events = getAllEvents();
    // console.log(events);

    const findEvents = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch handleSearch={findEvents} />
            <EventList items={events} />
        </Fragment>
    )
}

export default EventsPage;