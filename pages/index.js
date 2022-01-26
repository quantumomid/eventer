import { Fragment } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../firebase/utils";
import PageHeadData from "../components/head/PageHeadData";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

export const getStaticProps = async() => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            featuredEvents
        },
        revalidate: 1800
    }
}

const HomePage = ({ featuredEvents }) => {
    if(!featuredEvents) return <p>Loading....</p>
    return (
        <Fragment>
            <PageHeadData />
            <NewsletterRegistration />
            <EventList items={featuredEvents} />
        </Fragment>
    )
}

export default HomePage;