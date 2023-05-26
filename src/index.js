import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import Book from "./Book";
import { deleteBook, displayBook } from "./user-interface";

const firebaseConfig = {
  apiKey: "AIzaSyABQ_G9FGLX-KOFsD09FO9BLwnn4sdt2t0",
  authDomain: "odin-library-62dc1.firebaseapp.com",
  projectId: "odin-library-62dc1",
  storageBucket: "odin-library-62dc1.appspot.com",
  messagingSenderId: "1047536753714",
  appId: "1:1047536753714:web:a58bda38f20129bb43b02b",
  measurementId: "G-22GZ2HPKCM"
};

const app = initializeApp(firebaseConfig);

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
      }
    });
  });
}

function attachNewBookListeners() {
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
    saveBook(newBook);
    
    addBookForm.reset();
    addBookForm.removeAttribute('style');
  });
}

// Saves a new book to Cloud Firestore
async function saveBook(book) {
  try {
    await addDoc(collection(getFirestore(), 'books'), {
      title: book.title,
      author: book.author,
      pages: book.pages,
      read: book.read
    });
  } catch (e) {
    console.error('Error writing new message to Firebase Database', e);
  }
}

loadBooks();
attachNewBookListeners();