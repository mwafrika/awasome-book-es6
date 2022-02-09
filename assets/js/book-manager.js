const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const bookShelf = document.querySelector('.book-shelf');
const bookCard = document.createElement('div');

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
  populateLocalStorage(); // check if local storage is empty
  const books = getBooks();
  books.splice(id, 1);

  localStorage.setItem('books', JSON.stringify(books));
  document.querySelector(`#container${id}`).remove();
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBookFromLocalStorage(id) {
  console.log(id, 'remove book');
  removeBook(id);
}

function showBook() {
  populateLocalStorage();

  const books = getBooks();
  console.log(books, 'books');
  bookCard.innerHTML = '';
  for (let i = 0; i < books.length; i++) {
    bookCard.innerHTML += `
        <div id="container${i}">
        <p>${books[i].title}</p>
        <p>${books[i].author}</p>
        <button type="submit" id="book${i}"  class="remove-button">Remove</button><br><br>
        <hr>
        </div>
        `;
    // onclick="removeBookFromLocalStorage(${i})"

    bookShelf.appendChild(bookCard);
    document.querySelector(`#book${i}`).addEventListener('click', (e) => {
      console.log('kjejejee');
      removeBookFromLocalStorage(e.target.parentElement.id);
    });
  }
}
showBook();

document.querySelector('.book-input').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;

  const book = {
    title,
    author,
  };
  console.log(book);
  addBook(book);
  clearFields();
  showBook();
});
