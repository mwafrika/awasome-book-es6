const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addButton = document.querySelector('.add-button');
const bookShelf = document.querySelector('.book-shelf');
let bookCard = document.createElement('div');

let bookList = [];

// add function

function addBook() {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const book = { title, author };
  if (title && author) {
    bookList.push(book);
    showBook(book);
    clearFields();
    console.log(book);
  }
}

function showBook(book) {

  bookCard.innerHTML += `
 <p>${book.title}</p>
 <p>${book.author}</p>
 `;
  bookShelf.appendChild(bookCard);
  return book;
}

function clearFields() {
  inputTitle.value = '';
  inputAuthor.value = '';
}

addButton.addEventListener('click', addBook);
