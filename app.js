class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = `by ${author}`;
        this.pages = `${pages} pages`;
        this.read = read ? 'read' : 'not read yet';
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

let myLibrary = [
    new Book('The Perks of Being a Wallflower', 'Stephen Chbosky', 256, true),
    new Book('Almond', 'Sohn Won-pyung', 272, true),
    new Book('The Invisible Life of Addie LaRue', 'V. E. Schwab', 448, false)
];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const library = document.querySelector('div#library');
    for (const book of myLibrary) {
        const bookCard = document.createElement('div');

        const title = document.createElement('h1');
        title.textContent = book.title;
        const author = document.createElement('h2');
        author.textContent = book.author;
        const pages = document.createElement('p');
        pages.innerHTML = book.pages;
        const read = document.createElement('p');
        read.innerHTML = book.read;

        bookCard.appendChild(title);
        bookCard.appendChild(author)
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.classList.add('card');

        library.appendChild(bookCard);
    }
}

displayBooks();