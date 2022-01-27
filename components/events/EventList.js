import EventListItem from "./EventListItem";
import styles from "./EventList.module.css";

const EventList = ({ items }) => (
    <ul className={styles.list}>
        { items.map(event => <EventListItem key={event.id} item={event} />) }
    </ul>
)


export default EventList;