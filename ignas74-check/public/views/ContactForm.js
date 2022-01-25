import AbstractView from './AbstractView.js';

export default class ContactForm extends AbstractView {
    constructor() {
        super('Contact Form');
    }

    render(el) {
        el.innerHTML = `
            <section>
                <form class="contact_form_inputs" method="post">
                    <div class="input_container">
                        <label for="name_input"><h3>Name</h3></label>
                        <input type="text" id="name_input" />
                    </div>

                    <div class="input_container">
                        <label for="email_input"><h3>Email</h3></label>
                        <input type="email" id="email_input" />
                    </div>

                    <div class="input_container">
                        <label for="msg_input"><h3>Message</h3></label>
                        <textarea id="msg_input"></textarea>
                    </div>

                    <button type="button" id="submit_input"><h3>Send</h3></button>
                </form>
            </section>
        `;
    }
}
