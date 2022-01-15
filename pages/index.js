import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummyData";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();
    return (
        <main>
            <h1>Welcome to Omid's blog</h1>
            <EventList items={featuredEvents} />
        </main>
    )
}

export default HomePage;