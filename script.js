const API_URL = "http://localhost:3000/events";

const api = new EventAPI(API_URL);
const eventModel = new EventModel(api);
const eventView = new EventView();
const eventController = new EventController(eventModel, eventView);
