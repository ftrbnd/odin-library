// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, deleteDoc, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, runTransaction } from "firebase/firestore";
import Book from "./Book";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABQ_G9FGLX-KOFsD09FO9BLwnn4sdt2t0",
  authDomain: "odin-library-62dc1.firebaseapp.com",
  projectId: "odin-library-62dc1",
  storageBucket: "odin-library-62dc1.appspot.com",
  messagingSenderId: "1047536753714",
  appId: "1:1047536753714:web:a58bda38f20129bb43b02b",
  measurementId: "G-22GZ2HPKCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Saves a new book to Cloud Firestore.
async function saveBook(book) {
  // Add a new book entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), 'books'), {
      title: book.title,
      author: book.author,
      pages: book.pages,
      read: book.read
    });
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

function loadBooks() {
  const recentBooksQuery = query(collection(getFirestore(), 'books'), orderBy('author'), limit(12));
  
  onSnapshot(recentBooksQuery, function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        deleteBook(change.doc.id)
      } else {
        const bookData = change.doc.data();
        const book = new Book(
          bookData.title,
          bookData.author,
          bookData.pages,
          bookData.read,
          change.doc.id
        );

        displayBook(book);
        console.log(`${change.doc.id} was displayed`);
      }
    });
  });
}

function displayBook(book) {
  const div = document.getElementById(book.id);
  if (div) div.parentNode.removeChild(div);

  const libraryDiv = document.querySelector('div#library');

  const bookCard = document.createElement('div');
  bookCard.setAttribute('id', `${book.id}`);

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
    console.log('Transaction failed: ', e);
  }
}

// Delete a Book from the UI
function deleteBook(bookId) {
  const div = document.getElementById(bookId);
  if (div) {
    div.parentNode.removeChild(div);
    console.log(`${change.doc.id} was removed from the UI`);
  }
}

loadBooks();