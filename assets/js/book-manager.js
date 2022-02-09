const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addButton = document.querySelector('.add-button');
const bookShelf = document.querySelector('.book-shelf');
let bookCard = document.createElement('div');

let Book = function BookList(title, author) {
  this.title = title;
  this.author = author;

  this.removeButton = function removeButton(element) {
    if (element.classList.contains('remove-button')) {
      element.parentElement.remove(element);
    }
  };

  this.getToloStorage = function getToloStorage() {
    let book;
    if (!localStorage.getItem('books')) {
      book = [];
    } else {
      book = JSON.parse(localStorage.getItem('books'));
    }
    return book;
  };

  this.addToLocalStorage = function addToLocalStorage(book) {
    let books = this.getToloStorage();
    console.log(book, 'add');
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  this.removeToLocalStorage = function removeToLocalStorage(id) {
    let books = this.getToloStorage();
    let tempBooks = [];
    console.log(books);
    books.forEach((book, index) => {
      if (index !== parseInt(id)) {
        tempBooks.push(book);
      }
    });
    books = tempBooks;
    console.log(tempBooks);
    localStorage.setItem('books', JSON.stringify(books));
  };

  this.clearFields = function clearFields() {
    inputTitle.value = '';
    inputAuthor.value = '';
  };

  this.addBook = function addBook(book, id) {
    bookCard.innerHTML += `
        <div id=${id}>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button type="submit" class="remove-button">Remove</button>
        </div>
        `;
    bookShelf.appendChild(bookCard);
  };

  this.showBook = function showBook() {
    const obj = this.getToloStorage();

    obj.forEach((book, index) => {
      console.log('itemsss', index);
      this.addBook(book, index);
    });
  };
};

document.querySelector('.book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;

  if (title && author) {
    const bookList = new Book(title, author);
    bookList.addBook(bookList);
    bookList.addToLocalStorage(bookList);
    bookList.clearFields();
  }
});

bookShelf.addEventListener('click', function (event) {
  console.log('Parent', event.target.parentElement.id);
  const bookList = new Book();
  bookList.removeButton(event.target);
  bookList.removeToLocalStorage(event.target.parentElement.id);
});
const bookList = new Book();
document.addEventListener('DOMContentLoaded', bookList.showBook());
