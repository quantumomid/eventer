import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../firebase/utils";
import PageHeadData from "../../components/head/PageHeadData";

export const getServerSideProps = async (context) => {
    const { params } = context;

    const filter = params.slug;
    const filteredYear = filter[0];
    const filteredMonth = filter[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

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
                    <PageHeadData title="Filtered Events" descriptionMetaContent={`All events for provided filter`} />
                    <ErrorAlert><p>Invalid Filter Values - please try another search</p></ErrorAlert>                    
                    <div className="center">
                        <Button href="/events">Show All Events</Button>
                    </div>
                </Fragment>
            )
    }    

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>,
                <PageHeadData title="Filtered Events" descriptionMetaContent={`All events for ${desiredDate.month}/${desiredDate.year}`} />
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
            <PageHeadData title="Filtered Events" descriptionMetaContent={`All events for ${desiredDate.month}/${desiredDate.year}`} />
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export default FilteredEventsPage;