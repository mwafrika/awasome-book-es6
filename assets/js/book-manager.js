const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addButton = document.querySelector('.add-button');
const bookShelf = document.querySelector('.book-shelf');
let bookCard = document.createElement('div');
let Mybooks = [];
class BookList {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Book {
  static removeButton(element) {
    if (element.classList.contains('remove-button')) {
      element.parentElement.remove(element);
    }
  }

  static getToloStorage() {
    let book;
    if (!localStorage.getItem('books')) {
      book = [];
    } else {
      book = JSON.parse(localStorage.getItem('books'));
    }
    return book;
  }

  static addToLocalStorage(book) {
    let books = Book.getToloStorage();
    console.log(book, 'add');
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeToLocalStorage(id) {
    let books = Book.getToloStorage();
    books.forEach((book, index) => {
      console.log('Book removed', index);
      if (index === id) {
        book.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static clearFields() {
    inputTitle.value = '';
    inputAuthor.value = '';
  }

  static addBook(book) {
    bookCard.innerHTML += `
        <div>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button type="submit" class="remove-button">Remove</button>
        </div
        `;
    bookShelf.appendChild(bookCard);
  }

  static showBook() {
    const obj = Book.getToloStorage();

    obj.forEach((book, index) => {
      console.log('itemsss', index);
      Mybooks.push(index);
      Book.addBook(book);
    });
  }
}

document.querySelector('.book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;

  if (title && author) {
    const bookList = new BookList(title, author);
    Book.addBook(bookList);
    Book.addToLocalStorage(bookList);
    Book.clearFields();
  }
});

bookShelf.addEventListener('click', function (event) {
  //   console.log('id', +event.target.dataset.id);
  Book.removeButton(event.target);
});
document.addEventListener('DOMContentLoaded', Book.showBook);
