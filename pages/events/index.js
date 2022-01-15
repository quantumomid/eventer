import { getAllEvents } from "../../dummyData";
import EventList from "../../components/events/EventList";

const EventsPage = () => {

    const events = getAllEvents();
    // console.log(events);

    return (
        <EventList items={events} />
    )
}

export default EventsPage;