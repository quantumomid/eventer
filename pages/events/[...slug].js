import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../dummyData";

const FilteredEventsPage = () => {
    const router = useRouter();
    const filteredData = router.query.slug;
    console.log({filteredData});

    if(!filteredData) {
        return <p className="center">Loading......</p>
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];
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
            return (
                <Fragment>
                    <ErrorAlert><p>Invalid Filter Values - please try another search</p></ErrorAlert>                    
                    <div className="center">
                        <Button href="/events">Show All Events</Button>
                    </div>
                </Fragment>
            )
    }

    // Now that we have our validations - we can get the filtered events
    const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth});

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

    const date = new Date(numYear, numMonth-1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export default FilteredEventsPage;