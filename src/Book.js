export default class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read ? 'Read' : 'Not read yet';
        this.id = id;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}