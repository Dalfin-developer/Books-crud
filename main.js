let Books = []
const booksBody = document.getElementById("booksBody")
const bookForm = document.getElementById("bookForm")
const addBook = document.getElementById("addBook")
const edit = document.getElementById("edit")

const category = document.getElementById("category")
const author = document.getElementById("author")
const Book_name = document.getElementById("Book_name")

const searchAuthor= document.getElementById("searchAuthor")
const searchCategory = document.getElementById("searchCategory")
if (localStorage.getItem('books')) {
    Books = JSON.parse(localStorage.getItem('books'))
    displayBooks()
}

//fetching data from the books form
bookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const categoryInput = category.value
    const authorInput = author.value
    const Book_nameInput = Book_name.value
    const Eindex = edit.value
    if (categoryInput && authorInput && Book_nameInput) {        
        if (Eindex==="") {
            Books.push({
                category: categoryInput,
                author: authorInput,
                Book_name: Book_nameInput
            }

            )
        }
        
        else {
            Books[Eindex]={
                category:categoryInput,
                author:authorInput,
                Book_name:Book_nameInput

            }
         Eindex.value = ""
         addBook.innerText = "Add Book"
        }
            
        console.log(Books);
        localStorage.setItem('books', JSON.stringify(Books))
        bookForm.reset()
        displayBooks()
    }
    else {
        alert("Please Fill the form completely!")
    }
})
searchAuthor.addEventListener("input",displayBooks)
searchCategory.addEventListener("input",displayBooks)

//display books
function displayBooks() {
    booksBody.innerHTML = ""
    const searchAuthorInput = searchAuthor.value.toLowerCase()
    const searchCategoryInput = searchCategory.value.toLowerCase()
    
    Books.forEach((b, i) => {
        const hasauthor = b.author.toLowerCase().includes(searchAuthorInput)
        const hasCategory = b.category.toLowerCase().includes(searchCategoryInput)
        if(hasCategory&&hasauthor){
        booksBody.innerHTML += `<tr>
                    <td>${i + 1}</td>
                    <td>${b.Book_name}</td>
                    <td>${b.author}</td>
                    <td>${b.category}</td>
                    <td><button onclick="editBooks(${i})" class="btn btn-warning me-3">Edit</button><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
                </tr>`
        }
    })
}

//function Delete
function deleteBook(Bindex) {
    if (confirm("Are you want to delete this book? ")) {
        Books.splice(Bindex, 1)
        localStorage.setItem('books', JSON.stringify(Books))
        displayBooks()
    }
}

//Edit Books
function editBooks(Eindex) {
    const editBook = Books[Eindex]
    category.value = editBook.category
    author.value = editBook.author
    Book_name.value = editBook.Book_name

    edit.value = Eindex
    addBook.innerText = "Edit Book"
}