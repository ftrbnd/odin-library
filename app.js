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
    const libraryDiv = document.querySelector('div#library');

    while (libraryDiv.firstChild) {
        libraryDiv.removeChild(libraryDiv.firstChild);
    }

    for (const book of myLibrary) {
        const bookCard = document.createElement('div');

        const title = document.createElement('h1');
        title.textContent = book.title;
        const author = document.createElement('h2');
        author.textContent = book.author;

        const bottomRow = document.createElement('div');
        bottomRow.classList.add('card-footer');

        const pages = document.createElement('p');
        pages.innerHTML = book.pages;
        const read = document.createElement('p');
        read.innerHTML = book.read;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('card-buttons');
        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add('toggle-read');
        toggleReadButton.style.background = "url('assets/read.svg')";
        toggleReadButton.setAttribute('id', `${myLibrary.indexOf(book)}`);
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.style.background = "url('assets/trash-can-outline.svg')";
        removeButton.setAttribute('id', `${myLibrary.indexOf(book)}`);
        buttonsDiv.appendChild(toggleReadButton);
        buttonsDiv.appendChild(removeButton);

        bottomRow.appendChild(pages);
        bottomRow.appendChild(read);
        bottomRow.appendChild(buttonsDiv);

        bookCard.appendChild(title);
        bookCard.appendChild(author)
        bookCard.appendChild(bottomRow);
        bookCard.classList.add('card');

        libraryDiv.appendChild(bookCard);
    }

    attachButtonListeners();
}

function attachButtonListeners() {
    const removeBookButtons = document.querySelectorAll('.remove');
    for (const btn of removeBookButtons) {
        btn.addEventListener('click', () => {
            console.log(`Removing book id #${btn.id}`);
            removeBookFromLibrary(btn.id);
        });
    }

    const toggleButtons = document.querySelectorAll('.toggle-read');
    for (const btn of toggleButtons) {
        btn.addEventListener('click', () => {
            console.log(`Toggling read status of book id #${btn.id}`);
            const newStatus = toggleReadStatus(btn.id);
            
            const statusText = btn.parentNode.parentNode.firstChild.nextSibling;
            statusText.textContent = newStatus;
        });
    }
}

function removeBookFromLibrary(bookId) {
    myLibrary.splice(bookId, 1);
    displayBooks();
}

function toggleReadStatus(bookId) {
    const currentStatus = myLibrary[bookId].read;
    myLibrary[bookId].read = currentStatus == 'Read' ? 'Not read yet' : 'Read';
    return myLibrary[bookId].read;
}

function attachNewBookFormAndButtonListeners() {
    const addBookForm = document.querySelector('form#new-book');
    const addBookButton = document.querySelector('button#add-book');

    addBookButton.addEventListener('click', () => {
        console.log('addBookButton click');
        if (!addBookForm.style.display) {
            addBookForm.style.display = 'flex';
        } else {
            addBookForm.removeAttribute('style');
        }
    });

    addBookForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const bookData = [...data.entries()];

        const newBook = new Book(bookData[0][1], bookData[1][1], bookData[2][1], bookData[3][1]);
        addBookToLibrary(newBook);

        addBookForm.reset();
        addBookForm.removeAttribute('style');
    });
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

displayBooks();
attachNewBookFormAndButtonListeners();