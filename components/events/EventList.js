import EventListItem from "./EventListItem";

const EventList = ({ items }) => {

    return (
        <ul>
            { items.map(event => <EventListItem key={event.id} item={event} />) }
        </ul>
    )
}

export default EventList;