const myLibrary = [new Book("The Hobbit", "JRR Tolkien", 295, false), new Book("Cat's Cradle", "Kurt Vonnegut", 200, true),
    new Book("The Hobbit", "JRR Tolkien", 295, false), new Book("Cat's Cradle", "Kurt Vonnegut", 200, true)];

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

function displayBooks() {

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.textContent = book.info();

        body.appendChild(bookCard);
    })
}

const body = document.querySelector(".book-grid");
const addBookDialog = document.querySelector("#add-book-dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeDialogButton = document.querySelector("#add-book-dialog > button");

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    addBookDialog.close();
})
