export default class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = `by ${author}`;
        this.pages = `${pages} pages`;
        this.read = read ? 'Read' : 'Not read yet';
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}