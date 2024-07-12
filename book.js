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
    let title_and_author = document.createElement('div');

    title.innerText = myLibrary[i].title;
    title.classList.add("title");
    title_and_author.appendChild(title);
    
    author.innerText = "By " + myLibrary[i].author;
    author.classList.add("author");
    title_and_author.appendChild(author);

    //"Read" check at top
    if(myLibrary[i].read){
        read.innerText = "Have Read";
        read.classList.add("read")
    }
    else {
        read.innerText = "Not Read";
        read.classList.add("not-read");
    }
    li.appendChild(read);

    //Then traditional book stuff
    title_and_author.classList.add("title-and-author")
    li.appendChild(title_and_author);

    //Pages at bottom
    pages.innerText = "Pages: " + myLibrary[i].pages;
    pages.classList.add("pages");
    li.appendChild(pages);

    li.classList.add("book");
    library.appendChild(li);
}