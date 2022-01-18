import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/EventContent";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventSummary from "../../components/event-detail/EventSummary";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getAllEvents, getEventById, getFeaturedEvents } from "../../firebase/utils";
// import { getEventById } from "../../dummyData";

export const getStaticPaths = async() => {
    const featuredEvents = await getFeaturedEvents();
    const paths = featuredEvents.map(event => ({ params: { eventID: event.id } }));
    // console.log({paths});
    return {
        paths, 
        fallback: true
    }
}

export const getStaticProps = async(context) => {
    const eventID = context.params.eventID;
    // console.log({eventID});
    const event = await getEventById(eventID);
    return {
        props: {
            event
        },
        revalidate: 30
    }
}

const EventDetailPage = ({ event }) => {
    // console.log({event});
    if(!event) {
        return <div className="center"><p>Loading....</p></div>
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