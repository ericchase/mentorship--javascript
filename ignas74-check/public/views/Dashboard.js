import AbstractView from '/views/AbstractView.js';

export default class Dashboard extends AbstractView {
    constructor() {
        super('Dashboard');
    }

    render(el) {
        el.innerHTML = `
            <h1> Dashboard View </h1>
        `;
    }
}
