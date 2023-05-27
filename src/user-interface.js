import { deleteDoc, doc, getFirestore, runTransaction } from "firebase/firestore";

export function displayBook(book) {
  const div = document.getElementById(book.id);
  if (div) div.parentNode.removeChild(div);

  const libraryDiv = document.querySelector('div#library');

  const bookCard = document.createElement('div');
  bookCard.setAttribute('id', `${book.id}`);

  const title = document.createElement('h1');
  title.textContent = book.title;
  const author = document.createElement('h2');
  author.textContent = `by ${book.author}`;

  const bottomRow = document.createElement('div');
  bottomRow.classList.add('card-footer');

  const pages = document.createElement('p');
  pages.innerHTML = `${book.pages} pages`;
  const read = document.createElement('p');
  read.innerHTML = book.read;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('card-buttons');
  const toggleReadButton = document.createElement('button');
  toggleReadButton.classList.add('toggle-read');
  toggleReadButton.style.background = "url('../assets/read.svg')";
  toggleReadButton.setAttribute('id', `${book.id}`);
  toggleReadButton.addEventListener('click', () => {
    toggleReadStatus(book.id);
    console.log(`Toggling read status of book id #${book.id}`);
  });

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.style.background = "url('../assets/trash-can-outline.svg')";
  removeButton.setAttribute('id', `${book.id}`);
  removeButton.addEventListener('click', () => {
    deleteDoc(doc(getFirestore(), 'books', book.id))
    console.log(`Removed book id #${book.id} from Firestore`);
  });

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

async function toggleReadStatus(bookId) {
  const bookRef = doc(getFirestore(), 'books', bookId);

  try {
    await runTransaction(getFirestore(), async (transaction) => {
      const bookDoc = await transaction.get(bookRef);
      if (!bookDoc.exists()) throw 'Document does not exist!';

      const newReadStatus = !bookDoc.data().read;
      transaction.update(bookRef, { read: newReadStatus });
    });
    console.log('Transaction successfully committed!');
  } catch (e) {
    console.error('Transaction failed: ', e);
  }
}

export function deleteBook(bookId) {
  const div = document.getElementById(bookId);
  if (div) {
    div.parentNode.removeChild(div);
    console.log(`${bookId} was removed from the UI`);
  }
}