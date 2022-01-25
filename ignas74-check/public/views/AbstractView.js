export default class {
    constructor(title) {
        this.title = title;
        this.setTitle(title);
    }

    setTitle(title) {
        document.title = title;
    }

    render(el) {}
}
