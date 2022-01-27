import { Fragment } from "react";
import EventContent from "../../components/event-detail/EventContent";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventSummary from "../../components/event-detail/EventSummary";
import { getEventById, getFeaturedEvents } from "../../firebase/utils";
import PageHeadData from "../../components/head/PageHeadData";
import Comments from "../../components/input/Comments";

export const getStaticPaths = async() => {
    const featuredEvents = await getFeaturedEvents();
    const paths = featuredEvents.map(event => ({ params: { eventID: event.id } }));
    return {
        paths, 
        fallback: true
    }
}

export const getStaticProps = async(context) => {
    const eventID = context.params.eventID;
    const event = await getEventById(eventID);
    return {
        props: {
            event
        },
        revalidate: 30
    }
}

const EventDetailPage = ({ event }) => {
    if(!event) {
        return <div className="center"><p>Loading....</p></div>
    }

    return (
        <Fragment>
            <PageHeadData title={event.title} descriptionMetaContent={event.description} />
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
            <Comments eventID={event.id} />
        </Fragment>
    )
}

export default EventDetailPage;