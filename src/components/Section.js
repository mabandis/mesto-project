export class Section {
    constructor ({renderer}, selector) {
        this.renderer = renderer;
        this.container = document.querySelector(selector);
    }

    renderItems(res) {
        res.forEach(this.renderer);
    }   

    addItem(cardElement) {
        this.container.prepend(cardElement);
    }
}
