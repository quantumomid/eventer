export const getAllEvents = async () => {
    const response  = await fetch("https://eventsnextjs-default-rtdb.europe-west1.firebasedatabase.app/events.json");
    const eventsData = await response.json();
    // console.log(eventsData);

    const events = [];
    // Can use for-in loop to iterate over object's keys
    for (const key in eventsData){
        events.push({
            id: key,
            ...eventsData[key]
        });
    }
    // console.log(events);
    return events;
}

export const getFeaturedEvents = async () => {
    const DUMMY_EVENTS = await getAllEvents();
    return DUMMY_EVENTS.filter((event) => event.isFeatured);
}