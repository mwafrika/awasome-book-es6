const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addButton = document.querySelector('.add-button');
const bookShelf = document.querySelector('.book-shelf');
let bookCard = document.createElement('div');

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

  static saveToLocalStorage() {}

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
    const obj = [
      {
        title: 'geo',
        author: 'RDC',
      },
      {
        title: 'histore',
        author: 'Rwanda',
      },
      {
        title: 'histore 3',
        author: 'Rwanda',
      },
    ];

    obj.forEach((book) => {
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
    Book.clearFields();
  }
});

bookShelf.addEventListener('click', function (event) {
  Book.removeButton(event.target);
});
document.addEventListener('DOMContentLoaded', Book.showBook);
