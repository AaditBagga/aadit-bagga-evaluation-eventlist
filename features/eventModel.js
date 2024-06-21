class EventModel {
    constructor(api) {
        this.api = api;
        this.events = [];
    }

    async loadEvents() {
        this.events = await this.api.fetchEvents();
        return this.events;
    }

    async addEvent(event) {
        const newEvent = await this.api.createEvent(event);
        this.events.push(newEvent);
        return newEvent;
    }

    async editEvent(id, updatedEvent) {
        const updated = await this.api.updateEvent(id, updatedEvent);
        const index = this.events.findIndex(event => event.id === id);
        this.events[index] = updated;
        return updated;
    }

    async removeEvent(id) {
        await this.api.deleteEvent(id);
        this.events = this.events.filter(event => event.id !== id);
    }
}
