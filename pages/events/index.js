import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import { Fragment } from "react";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../firebase/utils";
import PageHeadData from "../../components/head/PageHeadData";

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

    const findEvents = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <PageHeadData title="All Events" />
            <EventsSearch handleSearch={findEvents} />
            <EventList items={events} />
        </Fragment>
    )
}

export default EventsPage;