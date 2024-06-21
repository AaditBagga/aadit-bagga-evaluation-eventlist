class EventAPI {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchEvents() {
        const response = await fetch(this.apiUrl);
        return response.json();
    }

    async createEvent(event) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
        return response.json();
    }

    async updateEvent(id, event) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });
        return response.json();
    }

    async deleteEvent(id) {
        await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
    }
}
