import { getAllEvents } from "../../dummyData";

const EventsPage = () => {

    const events = getAllEvents();

    console.log(events);

    return (
        <h1>Welcome to the Event's Main Page</h1>
    )
}

export default EventsPage;