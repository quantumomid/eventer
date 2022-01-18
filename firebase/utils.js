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
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export const getEventById = async(id) => {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
  
    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }