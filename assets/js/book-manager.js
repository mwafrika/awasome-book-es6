const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const bookShelf = document.querySelector('.book-shelf');
const bookCard = document.createElement('div');

// const Book = function BookList(title, author) {
//   this.title = title;
//   this.author = author;

//   this.removeButton = function removeButton(element) {
//     if (element.classList.contains('remove-button')) {
//       element.parentElement.remove(element);
//     }
//   };

//   this.getToloStorage = function getToloStorage() {
//     let book;
//     if (!localStorage.getItem('books')) {
//       book = [];
//     } else {
//       book = JSON.parse(localStorage.getItem('books'));
//     }
//     return book;
//   };

//   this.addToLocalStorage = function addToLocalStorage(book) {
//     const books = this.getToloStorage();
//     books.push(book);
//     localStorage.setItem('books', JSON.stringify(books));
//   };

//   // setTimeout(() => {
//   this.removeToLocalStorage = function removeToLocalStorage(id) {
//     let books = this.getToloStorage();
//     const tempBooks = [];
//     books.forEach((book, index) => {
//       console.log(parseInt(id, 10));
//       if (index !== parseInt(id, 10)) {
//         tempBooks.push(book);
//       }
//     });
//     books = tempBooks;
//     localStorage.setItem('books', JSON.stringify(books));
//   };
//   // }, 10000);

//   this.clearFields = function clearFields() {
//     inputTitle.value = '';
//     inputAuthor.value = '';
//   };

//   this.addBook = function addBook(book, id) {
//     bookCard.innerHTML += `
//         <div id=${id}>
//         <p>${book.title}</p>
//         <p>${book.author}</p>
//         <button type="submit" class="remove-button">Remove</button><br><br>
//         <hr>
//         </div>
//         `;
//     bookShelf.appendChild(bookCard);
//   };

//   this.showBook = function showBook() {
//     const obj = this.getToloStorage();

//     obj.forEach((book, index) => {
//       this.addBook(book, index);
//     });
//   };
// };

// document.querySelector('.book-input').addEventListener('submit', (e) => {
//   e.preventDefault();
//   const title = inputTitle.value;
//   const author = inputAuthor.value;

//   setTimeout(() => {
//     if (title && author) {
//       const bookList = new Book(title, author);
//       bookList.addBook(bookList);
//       bookList.addToLocalStorage(bookList);
//       bookList.clearFields();
//     }
//   }, 1000);
// });

// bookShelf.addEventListener('click', (event) => {
//   const bookList = new Book();
//   bookList.removeButton(event.target);
//   bookList.removeToLocalStorage(event.target.parentElement.id);
// });
// const bookList = new Book();

// document.addEventListener('DOMContentLoaded', (e) => {
//   bookList.showBook();
// });

function populateLocalStorage() {
  if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
  }
}

function clearFields() {
  inputTitle.value = '';
  inputAuthor.value = '';
}

function getBooks() {
  const books = JSON.parse(localStorage.getItem('books'));
  return books;
}

function removeBook(id) {
  for (let i = 0; i < getBooks().length; i++) {
    if (i === id) {
      getBooks().splice(i, 1);
    }
    populateLocalStorage();
    // if (getBooks()[i].id === parseInt(id)) {
    //   getBooks().splice(i, 1);
    // }
  }
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBookFromLocalStorage(id) {
  console.log(id, 'remove book');
  removeBook(id);
  populateLocalStorage();
}

function showBook() {
  populateLocalStorage();

  const books = getBooks();
  console.log(books, 'books');
  for (let i = 0; i < books.length; i++) {
    bookCard.innerHTML += `
        <div id="${i}">
        <p>${books[i].title}</p>
        <p>${books[i].author}</p>
        <button type="submit" id="book${i}" class="remove-button">Remove</button><br><br>
        <hr>
        </div>
        `;
    bookShelf.appendChild(bookCard);
    document.querySelector(`#book${i}`).addEventListener('click', (event) => {
      console.log(i);
      removeBookFromLocalStorage(event.target.parentElement.id);
      console.log(event.target.parentElement.id, 'target');
      // event.target.parentElement.remove();
      showBook();
    });
  }
}
showBook();

document.querySelector('.book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const id = Math.floor(Math.random() * 100);
  const book = {
    title,
    author,
    // id,
  };
  console.log(book);
  addBook(book);
  clearFields();
  showBook();
});
