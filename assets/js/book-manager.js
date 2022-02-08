const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addButton = document.querySelector('.add-button');
const bookShelf = document.querySelector('.book-shelf');

let bookList = [];

// add function

function addBook(){
    const title = inputTitle.value;
    const author = inputAuthor.value;
    const book = { title , author };
    if(title && author){
        bookList.push(book)
    }
}

