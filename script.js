function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${isRead ? "has been read" : "not read yet"}`;
    }
}

function addBookToLibrary(book) {
    if (typeof book !== Book) {
        console.log("ERROR: not a book");
    }

    myLibrary.push(book);
}

function buildBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", currIndex++);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-book-button");
    removeButton.addEventListener("click", (e) => {
        const x = bookCard.getAttribute("data-id")
        // remove the Book from myLibrary
        myLibrary.splice(x, 1);

        // have to fix indexing shift when an item is removed 

        bookGrid.removeChild(bookCard);
        /*bookCard.remove();*/
    });

    bookCard.appendChild(removeButton);

    const title = document.createElement("h3");
    title.textContent = book.title;
    bookCard.appendChild(title);

    const author = document.createElement("h4");
    author.textContent = book.author;
    bookCard.appendChild(author);

    const numPages = document.createElement("p");
    numPages.textContent = "pages: "+ book.numPages;
    bookCard.appendChild(numPages);

    const isRead = document.createElement("p");
    console.log(typeof book.isRead);
    isRead.textContent = book.isRead == "on" ? "Has been read" : "Not read yet";
    bookCard.appendChild(isRead);

    return bookCard;
}

const myLibrary = []; //
let currIndex = 0;

const bookGrid = document.querySelector(".book-grid");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeDialogButton = document.querySelector(".close-dialog-button");
const bookForm = document.querySelector('form');

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    addBookDialog.close();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // get book form data
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    // instantiate new book
    const newBook = new Book();
    for ([key, value] of Object.entries(formProps)) {
        newBook[key] = value;
    }
    addBookToLibrary(newBook);

    let newBookCard = buildBookCard(newBook);
    bookGrid.appendChild(newBookCard);
    addBookDialog.close();

    console.log(myLibrary);
});