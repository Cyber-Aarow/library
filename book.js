const myLibrary = [];

function Book(title, author, pages, read, showing){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.showing = showing;
    this.color = [36, 21, 3];

    this.info = function(){
        let string = title + " by " + author + ", " + pages
            + " pages, ";
        if(read) string = string + "read.";
        else string = string + "not read yet.";
        return string;
    }

    if(read) {
        let R = Math.floor(Math.random() * 255);
        let G = Math.floor(Math.random() * 255);
        let B = Math.floor(Math.random() * 255);
        this.color = [R, G, B];
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

            let R = myLibrary[i].color[0];
            let G = myLibrary[i].color[1];
            let B = myLibrary[i].color[2];
            li.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
            if(myLibrary[i].read) {
                if(G >= 150) li.style.color = `rgb(${R}, 1, ${B})`;
                else li.style.color = `rgb(${R}, 255, ${B})`;
            }
            li.classList.add("book");
            const counter = i;
            //Info ***PROBLEM HERE***
            li.addEventListener("click", function(){
                li.style.opacity = "0";
                let bookInfo = document.querySelector('.book-info');
                bookInfo.style.backgroundColor = li.style.backgroundColor;
                bookInfo.style.color = li.style.color;
                bookInfo.classList.toggle("move-up");
                bookInfo.innerHTML = myLibrary[counter].info();
            });


            library.appendChild(li);
            myLibrary[i].showing = true;
        }
    }
}

function hideForm(){
    form.reset();
    form.classList.remove('active');
    overlay.classList.remove('active');
}

function showForm(){
    form.classList.add('active');
    overlay.classList.add('active');
}

//For Testing
addBookToLibrary("LOTR", "Tolkien", 321, false);
addBookToLibrary("Warriors", "Erin Hunter", 123, true);

showLibrary();

//New Book Button
let button = document.querySelector('#new-book-button');
let form = document.querySelector('#add-book-form');
let overlay = document.querySelector('.overlay');
button.addEventListener('click', function(){
    showForm();
});

//Submit Form
form.addEventListener('submit', function(event){
    event.preventDefault();

    const new_title = document.querySelector('#form-title').value;
    const new_author = document.querySelector('#form-author').value;
    const new_pages = document.querySelector('#form-pages').value;
    const new_read = document.querySelector('#read-check').checked;

    addBookToLibrary(new_title, new_author, new_pages, new_read);
    hideForm();
    showLibrary();
});

//Clicking on overlay closes form
overlay.addEventListener('click', hideForm);