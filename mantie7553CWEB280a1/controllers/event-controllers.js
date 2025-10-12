const events = [
    { id: 1, title: "Intro to Node", type: "workshop", open: true, date: "2025-09-20", description: "Beginner Node workshop." },
    { id: 2, title: "Advanced CSS", type: "workshop", open: false, date: "2025-08-25", description: "Layouts and animations." },
    { id: 3, title: "React Meetup", type: "meetup", open: true, date: "2025-10-05", description: "Community meetup." },
    { id: 4, title: "Design Thinking", type: "seminar", open: true, date: "2025-09-30", description: "UX principles." },
    { id: 5, title: "Docker Basics", type: "workshop", open: true, date: "2025-11-01", description: "Container workshop." },
    { id: 6, title: "Kubernetes 101", type: "workshop", open: false, date: "2025-07-18", description: "Intro to k8s." },
    { id: 7, title: "Startup Funding", type: "seminar", open: true, date: "2025-12-02", description: "Pitch tips." },
    { id: 8, title: "GraphQL Intro", type: "workshop", open: true, date: "2025-09-10", description: "APIs with GraphQL." },
    { id: 9, title: "Node Security", type: "seminar", open: true, date: "2025-11-15", description: "Security best practices." },
    { id: 10, title: "AI Ethics", type: "seminar", open: false, date: "2025-05-22", description: "Ethics talk." },
];

/**
 * Class that is used when adjusting the date of an event
 */
class Event
{
    id;
    title;
    type;
    open;
    date;
    description;
    constructor(event) {
        this.id = event.id;
        this.title = event.title;
        this.type = event.type;
        this.open = event.open;
        this.date = event.date;
        this.description = event.description;
    }


}

/**
 * Function to filter events so that they match the given type or status
 * - handles both, either, or no filter values
 * @param filter a value for a type and a value for a status
 * @returns {[{date: string, description: string, id: number, title: string, type: string, open: boolean},{date: string, description: string, id: number, title: string, type: string, open: boolean},{date: string, description: string, id: number, title: string, type: string, open: boolean},{date: string, description: string, id: number, title: string, type: string, open: boolean},{date: string, description: string, id: number, title: string, type: string, open: boolean},null,null,null,null,null]|({date: string, description: string, id: number, title: string, type: string, open: boolean}|{date: string, description: string, id: number, title: string, type: string, open: boolean}|{date: string, description: string, id: number, title: string, type: string, open: boolean}|{date: string, description: string, id: number, title: string, type: string, open: boolean}|{date: string, description: string, id: number, title: string, type: string, open: boolean})[]}
 */
exports.filterEvents = (filter) => {
    if (filter)
    {
        return events.filter((event) => (event.open.toString() === filter.status || filter.status === 'all')
            && (event.type === filter.type || filter.type === 'all'));
    }
    return events;
}

/**
 * Function to change the date to the difference in dates from the current date
 * to the closing date
 * - Creates a copy of each event as an Event object with a date value
 * representing the number of days until the event date
 * @param originArray the array of items we are adjusting
 * @returns {*[]} an array of items with a different date attribute
 */
exports.changeDate = (originArray) => {
    let copyArray = [];
    for (let i = 0; i < originArray.length; i++)
    {
        copyArray[i] = new Event(originArray[i]);
        let difference =
            Math.ceil((new Date(originArray[i].date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        copyArray[i].date = difference < 0 ? null : difference;
    }
    return copyArray;
}

/**
 *  Function used to implement pagination
 *  - Limits the number of items shown to 4
 * @param pageNum the page number that is to be displayed
 * @param originArray an array of items that has been put through the filter function
 * @returns {*[]} an array of items to be displayed for the given page
 */
exports.getPagedEvents = (pageNum, originArray) => {
    pageNum = pageNum !== null ? pageNum : 1;
    let copyArray = [];
    let pos = (pageNum-1) * 4;
    for (let i = 0; i < 4; i++)
    {
        if (pos + i < originArray.length)
        {
            copyArray.push(new Event(originArray[pos+ i]));
        }
    }
    return copyArray;
}