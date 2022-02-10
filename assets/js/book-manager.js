const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const bookShelf = document.querySelector('.book-shelf');
const bookCard = document.createElement('div');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  randomId() {
    return Math.round(Math.random() * 10000000);
  }

  populateLocalStorage() {
    if (!localStorage.getItem('books')) {
      localStorage.setItem('books', JSON.stringify([]));
    }
  }
  clearFields() {
    inputTitle.value = '';
    inputAuthor.value = '';
  }

  getBooks() {
    const books = JSON.parse(localStorage.getItem('books'));
    return books;
  }
  removeBook(id) {
    const books = this.getBooks();
    const newBooks = books.filter((book) => book.id.toString() !== id);
    localStorage.setItem('books', JSON.stringify(newBooks));
    document.querySelector(`#container${id}`).remove();
  }
  addBook(book) {
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  showBook() {
    this.populateLocalStorage();
    const books = this.getBooks();
    bookCard.innerHTML = '';
    for (let i = 0; i < books.length; i += 1) {
      const book = books[i];
      bookCard.innerHTML += `
        <div id="container${book.id}">
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button type="button" id="${book.id}" class="remove-button">Remove</button><br><br>
        <hr>
        </div>
        `;
      const removeButton = document.querySelectorAll('.remove-button');
      if (removeButton.length) {
        removeButton.forEach((button) => {
          button.addEventListener('click', () => {
            this.removeBookFromLocalStorage(button.id);
          });
        });
      }
      bookShelf.appendChild(bookCard);
    }
  }

  removeBookFromLocalStorage(id) {
    this.removeBook(id);
    this.showBook();
  }
}

// const randomId = () => Math.round(Math.random() * 100);

// function populateLocalStorage() {
//   if (!localStorage.getItem('books')) {
//     localStorage.setItem('books', JSON.stringify([]));
//   }
// }

// function clearFields() {
//   inputTitle.value = '';
//   inputAuthor.value = '';
// }

// function getBooks() {
//   const books = JSON.parse(localStorage.getItem('books'));
//   return books;
// }

// function removeBook(id) {
//   const books = getBooks();
//   const b = books.filter((book) => book.id.toString() !== id);
//   localStorage.setItem('books', JSON.stringify(b));
//   document.querySelector(`#container${id}`).remove();
// }

// function addBook(book) {
//   const books = getBooks();
//   books.push(book);
//   localStorage.setItem('books', JSON.stringify(books));
// }

// function removeBookFromLocalStorage(id) {
//   removeBook(id);
//   showBook();
// }

// function showBook() {
//   populateLocalStorage();
//   const books = getBooks();
//   bookCard.innerHTML = '';
//   for (let i = 0; i < books.length; i += 1) {
//     const book = books[i];
//     bookCard.innerHTML += `
//         <div id="container${book.id}">
//         <p>${book.title}</p>
//         <p>${book.author}</p>
//         <button type="button" id="${book.id}" class="remove-button">Remove</button><br><br>
//         <hr>
//         </div>
//         `;
//     const removeButton = document.querySelectorAll('.remove-button');
//     if (removeButton.length) {
//       removeButton.forEach((button) => {
//         button.addEventListener('click', () => {
//           removeBookFromLocalStorage(button.id);
//         });
//       });
//     }
//     bookShelf.appendChild(bookCard);
//   }
// }

// showBook();

document.querySelector('.book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(inputTitle.value, inputAuthor.value);
  const title = book.title;
  const author = book.author;
  const id = book.randomId();

  const bookObjt = {
    id: id,
    title,
    author,
  };
  if (title && author) {
    book.addBook(bookObjt);
    book.clearFields();
    book.showBook();
  }
});
