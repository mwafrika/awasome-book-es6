const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const bookShelf = document.querySelector('.book-shelf');
const bookCard = document.createElement('div');

const randomId = () => Math.round(Math.random() * 100);

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
  const books = getBooks();
  const b = books.filter((book) => book.id.toString() !== id);
  localStorage.setItem('books', JSON.stringify(b));
  document.querySelector(`#container${id}`).remove();
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBookFromLocalStorage(id) {
  removeBook(id);
  showBook();
}

function showBook() {
  populateLocalStorage();
  const books = getBooks();
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
          removeBookFromLocalStorage(button.id);
        });
      });
    }
    bookShelf.appendChild(bookCard);
  }
}

showBook();

document.querySelector('.book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;

  const book = {
    id: randomId(),
    title,
    author,
  };
  addBook(book);
  clearFields();
  showBook();
});
