import Dashboard from '/views/Dashboard.js';
import Cv from '/views/Cv.js';
import ContactForm from '/views/ContactForm.js';

// intercept navbar links and render the corresponding view
document.querySelectorAll('#nav > a').forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        const view = renderView(path);
        history.pushState(null, view.title, path);
    });
});

const routes = new Map([
    ['/Home', Dashboard],
    ['/CV', Cv],
    ['/Contact', ContactForm],
]);

function renderView(path) {
    const view = new (routes.get(path))();
    view.render(document.querySelector('#app'));
    return view;
}

window.addEventListener('popstate', (e) => {
    renderView(e.target.location.pathname);
});

const path = window.location.pathname;
renderView(path === '/' ? '/Home' : path);
