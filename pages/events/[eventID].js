import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/EventContent";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventSummary from "../../components/event-detail/EventSummary";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getEventById } from "../../dummyData";

const EventDetailPage = () => {

    const router = useRouter();

    const eventID = router.query.eventID;
    // console.log(eventID);
    const event = getEventById(eventID);
    // console.log(event);

    if(!event) {
        return <ErrorAlert><p>No event found :( !</p></ErrorAlert>
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics 
                date={event.date} 
                address={event.location} 
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{ event.description }</p>
            </EventContent>
        </Fragment>
    )
}

export default EventDetailPage;