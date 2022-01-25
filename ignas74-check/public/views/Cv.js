import AbstractView from './AbstractView.js';

export default class Cv extends AbstractView {
    constructor() {
        super('Curriculum Vitae');
    }

    render(el) {
        el.innerHTML = `
            <h1>Viewing Curriculum Vitae</h1>
            <canvas id="pdf-render"></canvas>
        `;

        renderCV(document.querySelector('#pdf-render'));
    }
}
