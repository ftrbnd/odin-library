let myLibrary = [
    new Book('The Perks of Being a Wallflower', 'Stephen Chbosky', 256, 'read'),
    new Book('Almond', 'Sohn Won-pyung', 272, 'read'),
    new Book('The Invisible Life of Addie LaRue', 'V. E. Schwab', 448, 'not read yet')
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const books = [];
    for (const book of myLibrary) {
        books.push(book.info());
    }
    return books;
}