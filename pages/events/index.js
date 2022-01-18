import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../firebase/utils";

export const getStaticProps = async() => {
    const allEvents = await getAllEvents();
    return {
        props: {
            events: allEvents
        },
        revalidate: 120
    }
}

const EventsPage = ({ events }) => {
    const router = useRouter();
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