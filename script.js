class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;

        this.info = function () {
            return `${this.title} by ${this.author}, ${this.numPages} pages, ${isRead ? "has been read" : "not read yet"}`;
        };
    }
    // toggles the isRead state of the book
    toggleIsRead() {
        this.isRead = !this.isRead;
    }
}

class Library {
    #myLibrary;
    #currIndex;

    constructor() {
        this.myLibrary = []
        this.currIndex = 0;
    }

    get myLibrary() {
        return this.#myLibrary;
    }
   
    set myLibrary(val) {
        this.#myLibrary = val;
    }

    get currIndex() {
        return this.#currIndex;
    }
   
    set currIndex(val) {
        this.#currIndex = val;
    } 

    addBook(book) {
        if (typeof book !== Book) {
            console.log("ERROR: not a book");
        }
        this.myLibrary.push(book);
    }

    removeBook(idx) {
        this.myLibrary.splice(idx, 1);
    }
}

let library = new Library();

// DOM: Everything below this is DOM manipulation 
function buildRemoveButton(bookCard) {
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-book-button");
    removeButton.addEventListener("click", (e) => {
        const x = bookCard.getAttribute("data-id");
        library.removeBook(x); 
        const bookCards = bookGrid.children;
        for (let i = 0; i <  bookCards.length; i++) {
            const idx = parseInt(bookCards[i].getAttribute("data-id"));
            if (idx > x) {
                bookCards[i].setAttribute("data-id", idx-1);
            }
        }
        library.currIndex = library.currIndex - 1; 
        bookGrid.removeChild(bookCard);
    });
    return removeButton;
}

function buildIsReadToggle(book, bookCard) {
    const isReadToggle = document.createElement("input");
    isReadToggle.type = "checkbox";
    isReadToggle.checked = book.isRead;
    isReadToggle.classList.add("is-read-toggle");
    isReadToggle.addEventListener("click", () => {
        const idx = parseInt(bookCard.getAttribute("data-id"));
        console.log(idx);
        console.log(library.myLibrary[idx]);
        const isRead = bookCard.querySelector(".is-read-text");
        isRead.innerText = book.isRead ? "Has been read" : "Not read yet";
    });
    return isReadToggle;
}

function buildBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", library.currIndex++);

    const removeButton = buildRemoveButton(bookCard);

    const title = document.createElement("h3");
    title.textContent = book.title;
    
    const author = document.createElement("h4");
    author.textContent = book.author;

    const numPages = document.createElement("p");
    numPages.textContent = "pages: "+ book.numPages;

    const isReadDiv = document.createElement("div");
    isReadDiv.classList.add("is-read-container");
    const isReadText = document.createElement("p");
    isReadText.classList.add("is-read-text");
    isReadText.innerText = book.isRead ? "Has been read" : "Not read yet";
    const isReadToggle = buildIsReadToggle(book, bookCard);
    isReadDiv.appendChild(isReadText)
    isReadDiv.appendChild(isReadToggle);

    bookCard.append(removeButton, title, author, numPages, isReadDiv);

    return bookCard;
}

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
    newBook.isRead = (newBook.isRead == "on") ? true : false;
    library.addBook(newBook);

    let newBookCard = buildBookCard(newBook);
    bookGrid.appendChild(newBookCard);
    addBookDialog.close();
});