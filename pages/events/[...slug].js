import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../firebase/utils";
import Head from "next/head";

export const getServerSideProps = async (context) => {
    const { params } = context;
    // console.log({params});
    const filter = params.slug;

    const filteredYear = filter[0];
    const filteredMonth = filter[1];
    // console.log({ filteredMonth, filteredYear });
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    // console.log({ numMonth, numYear });

    if(
        isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 || 
        numYear < 2021 || 
        numMonth > 12 ||
        numMonth < 1
        ) {
            return {
                props: { hasError: true }
                // notFound: true,
                // redirect: {
                //     destination: "/error"
                // }
            }
    }

    // Now that we have our validations - we can get the filtered events
    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth});
    
    return {
        props: {
            filteredEvents,
            desiredDate: {
                month: numMonth,
                year: numYear
            }
        }
    }
}

const FilteredEventsPage = ({ hasError, filteredEvents, desiredDate }) => {

    if(hasError) {
            return (
                <Fragment>
                    <ErrorAlert><p>Invalid Filter Values - please try another search</p></ErrorAlert>                    
                    <div className="center">
                        <Button href="/events">Show All Events</Button>
                    </div>
                </Fragment>
            )
    }    

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert><p>No events found for chosen field - please try another search</p></ErrorAlert>
                <div className="center">
                    <Button href="/events">Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(desiredDate.year, desiredDate.month-1);

    return (
        <Fragment>
            <Head>
                <title>Filtered Events</title>
                <meta name="description" content={`All events for ${desiredDate.month}/${desiredDate.year}`} />
            </Head>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export default FilteredEventsPage;