const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addButton = document.querySelector('.add-button');
const bookShelf = document.querySelector('.book-shelf');

let bookList = [];

// add function

function addBook() {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const book = { title, author };
  if (title && author) {
    bookList.push(book);
    showBook(book);
    console.log(book);
  }
}

function showBook(book) {
  const bookCard = document.createElement('div');

  bookCard.innerHTML = `
 <h3>${book.title}</h3>
 <h3>${book.author}</h3>
 `;
  bookShelf.appendChild(bookCard);
  return book;
}

addButton.addEventListener('click', addBook);
