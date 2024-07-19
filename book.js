const myLibrary = [];

function Book(title, author, pages, read, showing){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.showing = showing;

    this.info = function(){
        let string = title + " by " + author + ", " + pages
            + "pages, ";
        if(read) string = string + "read.";
        else string = string + "not read yet.";
        return string;
    }
}

function addBookToLibrary(title, author, pages, read, showing=false){
    let new_book = new Book(title, author, pages, read, showing);
    myLibrary.push(new_book);
}

function showLibrary(){
    let library = document.querySelector('#library');
    for(i=0; i<myLibrary.length; i++){
        if(myLibrary[i].showing === false){
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
            myLibrary[i].showing = true;
        }
    }
}

//For Testing
addBookToLibrary("LOTR", "Tolkien", 321, false);
addBookToLibrary("Warriors", "Eoin Colfer", 123, true);

showLibrary();


//New Book Button
let button = querySelector('#new-book');
let form = document.querySelector('#add-book-form');
button.addEventListener('click', function(){
    form.classList.toggle('hide');
    form.classList.toggle('reveal');
});

//Submit Form Button
let submit = querySelector('#submit');
submit.addEventListener('submit', function(event){
    event.preventDefault();

    const new_title = document.querySelector('#form-title').value;
    const new_author = document.querySelector('#form-author').value;
    const new_pages = document.querySelector('#form-pages').value;
    const new_read = document.querySelector('#read-check').value;

    addBookToLibrary(new_title, new_author, new_pages, new_read);
    showLibrary();
});