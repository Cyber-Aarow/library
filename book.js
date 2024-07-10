const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        let string = title + " by " + author + ", " + pages
            + "pages, ";
        if(read) string = string + "read.";
        else string = string + "not read yet.";
        return string;
    }
}

function addBookToLibrary(title, author, pages, read){
    let new_book = new Book(title, author, pages, read);
    myLibrary.push(new_book);
}


//For Testing
addBookToLibrary("LOTR", "Tolkien", 321, false);
addBookToLibrary("Warriors", "Eoin Colfer", 123, true);



let library = document.querySelector('#library');
for(i=0; i<myLibrary.length; i++){
    let li = document.createElement('li');
    let title = document.createElement('h4');
    let author = document.createElement('div');
    let pages = document.createElement('div');
    let read = document.createElement('div');

    title.innerText = myLibrary[i].title;
    li.appendChild(title);
    
    author.innerText = myLibrary[i].author;
    author.classList.add("author");
    li.appendChild(author);

    pages.innerText = myLibrary[i].pages;
    pages.classList.add("pages");
    li.appendChild(pages);

    read.innerText = myLibrary[i].read;
    read.classList.add("read");
    li.appendChild(read);

    li.classList.add("book");
    library.appendChild(li);
}