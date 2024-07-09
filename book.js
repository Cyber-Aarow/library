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
    let h4 = document.createElement('h4');
    let div = document.createElement('div');
    
    h4.innerText = myLibrary[i].title;
    li.appendChild(h4);
    
    div.innerText = myLibrary[i].author;
    div.classList.add("author");
    li.appendChild(div);
    div.classList.remove("author");

    div.innerText = myLibrary[i].pages;
    div.classList.add("pages");
    li.appendChild(div);
    div.classList.remove("pages");

    div.innerText = myLibrary[i].read;
    div.classList.add("read");
    li.appendChild(div);
    div.classList.remove("read");

    library.appendChild(li);
}