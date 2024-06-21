class EventView {
    constructor() {
        this.tableBody = document.getElementById('eventTableBody');
        this.addEventBtn = document.getElementById('addEventBtn');
    }

    displayEvents(events) {
        this.tableBody.innerHTML = '';
        events.forEach(event => {
            this.tableBody.appendChild(this.createEventRow(event, event.isEditing || false));
        });
    }

    createEventRow(event, isEditing) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = event.name || '';
        nameInput.disabled = !isEditing;
        nameCell.appendChild(nameInput);

        const startCell = document.createElement('td');
        const startInput = document.createElement('input');
        startInput.type = 'date';
        startInput.value = event.start || '';
        startInput.disabled = !isEditing;
        startCell.appendChild(startInput);

        const endCell = document.createElement('td');
        const endInput = document.createElement('input');
        endInput.type = 'date';
        endInput.value = event.end || '';
        endInput.disabled = !isEditing;
        endCell.appendChild(endInput);

        const actionsCell = document.createElement('td');

        const leftBtn = document.createElement('button');
        const rightBtn = document.createElement('button');

        if (event.id) {
            if (isEditing) {
                leftBtn.innerHTML = this.getSaveIcon();
                leftBtn.addEventListener('click', () => {
                    const updatedEvent = {
                        name: nameInput.value,
                        start: startInput.value,
                        end: endInput.value
                    };
                    if (this.validateEvent(updatedEvent)) {
                        this.onSave(event.id, updatedEvent);
                    }
                });

                rightBtn.innerHTML = this.getCancelIcon();
                rightBtn.addEventListener('click', () => {
                    this.onCancelEdit(event.id);
                });
            } else {
                leftBtn.innerHTML = this.getEditIcon();
                leftBtn.addEventListener('click', () => {
                    this.onEdit(event.id);
                });

                rightBtn.innerHTML = this.getDeleteIcon();
                rightBtn.addEventListener('click', () => {
                    this.onDelete(event.id);
                });
            }
        } else {
            leftBtn.innerHTML = this.getAddIcon();
            leftBtn.addEventListener('click', () => {
                const newEvent = {
                    name: nameInput.value,
                    start: startInput.value,
                    end: endInput.value
                };
                if (this.validateEvent(newEvent)) {
                    this.onAdd(newEvent);
                }
            });

            rightBtn.innerHTML = this.getCancelIcon();
            rightBtn.addEventListener('click', () => {
                row.remove();
            });
        }

        actionsCell.appendChild(leftBtn);
        actionsCell.appendChild(rightBtn);

        row.appendChild(nameCell);
        row.appendChild(startCell);
        row.appendChild(endCell);
        row.appendChild(actionsCell);

        return row;
    }

    validateEvent(event) {
        if (!event.name || !event.start || !event.end) {
            alert('Input not valid');
            return false;
        }

        if (new Date(event.start) > new Date(event.end)) {
            alert('Date mismatch: End date must be after start date');
            return false;
        }

        return true;
    }

    bindAddEvent(handler) {
        this.addEventBtn.addEventListener('click', () => {
            this.tableBody.appendChild(this.createEventRow({}, true));
        });
        this.onAdd = handler;
    }

    bindEditEvent(handler) {
        this.onEdit = handler;
    }

    bindSaveEvent(handler) {
        this.onSave = handler;
    }

    bindDeleteEvent(handler) {
        this.onDelete = handler;
    }

    bindCancelEdit(handler) {
        this.onCancelEdit = handler;
    }

    getEditIcon() {
        return `<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/icons/pencil.svg" width="15" height="15" alt="Edit Icon">`;
    }

    getDeleteIcon() {
        return `<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/icons/trash.svg" width="15" height="15" alt="Delete Icon">`;
    }

    getSaveIcon() {
        return `<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/icons/save.svg" width="15" height="15" alt="Save Icon">`;
    }

    getCancelIcon() {
        return `<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/icons/x.svg" width="15" height="15" alt="Cancel Icon">`;
    }

    getAddIcon() {
        return `<img src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/icons/plus.svg" width="15" height="15" alt="Add Icon">`;
    }
}
