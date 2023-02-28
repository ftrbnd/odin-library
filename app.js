const libraryDiv = document.querySelector('div#library');
const addBookButton = document.querySelector('button#add-book');
const addBookForm = document.querySelector('form');

class Book {
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

let myLibrary = [
    new Book('The Perks of Being a Wallflower', 'Stephen Chbosky', 256, true),
    new Book('Almond', 'Sohn Won-pyung', 272, true),
    new Book('The Invisible Life of Addie LaRue', 'V. E. Schwab', 448, false)
];

function displayBooks() {
    while (libraryDiv.firstChild) {
        libraryDiv.removeChild(libraryDiv.firstChild);
    }

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

        libraryDiv.appendChild(bookCard);
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function attachButtonListeners() {
    addBookButton.addEventListener('click', () => {
        if (addBookForm.style.display == 'flex') {
            addBookForm.style.display = 'none';
        } else {
            addBookForm.style.display = 'flex';
        }
    });

    addBookForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const bookData = [...data.entries()];

        const newBook = new Book(bookData[0][1], bookData[1][1], bookData[2][1], bookData[3][1]);
        addBookToLibrary(newBook);
    });
}

displayBooks();
attachButtonListeners();