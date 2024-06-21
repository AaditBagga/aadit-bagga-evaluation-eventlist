class EventController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindAddEvent(this.handleAddEvent.bind(this));
        this.view.bindEditEvent(this.handleEditEvent.bind(this));
        this.view.bindSaveEvent(this.handleSaveEvent.bind(this));
        this.view.bindDeleteEvent(this.handleDeleteEvent.bind(this));
        this.view.bindCancelEdit(this.handleCancelEdit.bind(this));

        this.loadEvents();
    }

    async loadEvents() {
        const events = await this.model.loadEvents();
        this.view.displayEvents(events);
    }

    async handleAddEvent(event) {
        await this.model.addEvent(event);
        this.view.displayEvents(this.model.events);
    }

    handleEditEvent(id) {
        this.model.events = this.model.events.map(event => {
            if (event.id === id) return { ...event, isEditing: true };
            return event;
        });
        this.view.displayEvents(this.model.events);
    }

    async handleSaveEvent(id, updatedEvent) {
        await this.model.editEvent(id, updatedEvent);
        this.view.displayEvents(this.model.events);
    }

    async handleDeleteEvent(id) {
        await this.model.removeEvent(id);
        this.view.displayEvents(this.model.events);
    }

    handleCancelEdit(id) {
        this.model.events = this.model.events.map(event => {
            if (event.id === id) return { ...event, isEditing: false };
            return event;
        });
        this.view.displayEvents(this.model.events);
    }
}
