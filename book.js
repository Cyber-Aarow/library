//Universal Variables
let myLibrary = [];

let button = document.querySelector('#new-book-button');
let form = document.querySelector('#add-book-form');
let overlayForm = document.querySelector('#form-overlay');
let bookInfo = document.querySelector('.book-info');
let overlayInfo = document.querySelector('#info-overlay');

function putBackBook(bookNumber){
    let book = document.querySelector(`#b${bookNumber}`);
    book.style.opacity = "1"; 
}

const defaultBrown = [36, 21, 3];
function Book(title, author, pages, read, showing){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.showing = showing;
    this.color = defaultBrown;

    this.info = function(){
        let string = title + " by " + author + ", " + pages
            + " pages, ";
        if(this.read) string = string + "finished reading.";
        else string = string + "not finished yet.";
        return string;
    }
    
    if(this.read) {
        let R = Math.floor(Math.random() * 255);
        let G = Math.floor(Math.random() * 255);
        let B = Math.floor(Math.random() * 255);
        this.color = [R, G, B];
    }
    else this.color = defaultBrown;
}

function addBookToLibrary(title, author, pages, read, showing=false){
    let new_book = new Book(title, author, pages, read, showing);
    myLibrary.push(new_book);

    if(myLibrary.length === 38){
        button.classList.replace('golden-button', 'deactivated-button');
        button.removeEventListener('click', showForm);
    }
}

function showLibrary(){
    let library = document.querySelector('#library');
    for(i=0; i<myLibrary.length; i++){
        const counter = i; //To be used in event listeners
        if(myLibrary[i].showing === false){
            let li = document.createElement('li');
            let remove = document.createElement('button');
            let titleContainer = document.createElement('div');
            let title = document.createElement('p');
            let author = document.createElement('div');

            let readCheckForm = document.createElement('form');
            let readCheck = document.createElement('input');
            let readCheckLabel = document.createElement('label');
            

            //X at top
            remove.innerHTML = "X";
            remove.classList.add('remove');
            remove.addEventListener('click', (event) => {
                if(myLibrary.length === 38){
                    button.classList.replace('deactivated-button', 'golden-button');
                    button.addEventListener('click', showForm);
                }

                const half1 = myLibrary.slice(0, counter);
                const half2 = myLibrary.slice(counter + 1);
                myLibrary = half1.concat(half2); //**PROBLEM HERE**
                library.removeChild(li);
                showLibrary();
                event.stopPropagation();
            });
            li.appendChild(remove);

            //Then sideways title 
            title.innerText = myLibrary[i].title;
            title.classList.add("title");
            titleContainer.appendChild(title);
            titleContainer.classList.add("title-container");
            li.appendChild(titleContainer);

            //Author's last name at bottom
            author.innerText = myLibrary[i].author;
            author.classList.add("author");
            li.appendChild(author);

            let R = myLibrary[i].color[0];
            let G = myLibrary[i].color[1];
            let B = myLibrary[i].color[2];
            li.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
            if(myLibrary[i].read) {
                if(G >= 150) li.style.color = `rgb(${R}, 1, ${B})`;
                else li.style.color = `rgb(${R}, 255, ${B})`;
            }
            li.classList.add("book");
            
            //Read change button
            readCheckForm.classList.add('book-read-check-form');
            readCheckForm.addEventListener('click', (event) => {
                event.stopPropagation();
            });
            readCheck.type = 'checkbox';
            if(myLibrary[counter].read) readCheck.checked = true;
            readCheck.classList.add('book-read-check');
            readCheck.id = `read-check-${counter}`;
            readCheckLabel.innerHTML = 'Done';
            readCheckLabel.classList.add('book-read-check-label');
            readCheckLabel.id = `read-check-label-${counter}`;
            readCheckLabel.htmlFor = `read-check-${counter}`;

            readCheck.addEventListener('change', ()=>{
                let R;
                let G;
                let B;
                const this_book = document.querySelector(`#b${counter}`);

                if(readCheck.checked){
                    //For info
                    myLibrary[counter].read = true;
                    //For background
                    R = Math.floor(Math.random() * 255);
                    G = Math.floor(Math.random() * 255);
                    B = Math.floor(Math.random() * 255);
                    //For text
                    if(G >= 150) this_book.style.color = `rgb(${R}, 1, ${B})`;
                    else this_book.style.color = `rgb(${R}, 255, ${B})`;
                }
                else{
                    //For info
                    myLibrary[counter].read = false;
                    //For background
                    R = defaultBrown[0];
                    G = defaultBrown[1];
                    B = defaultBrown[2];
                    //For text
                    this_book.style.color = 'goldenrod';
                }
                myLibrary[counter].color = [R, G, B];
                this_book.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
            });

            readCheckForm.appendChild(readCheck);
            readCheckForm.appendChild(readCheckLabel);
            li.appendChild(readCheckForm);


            //Info
            li.id = `b${counter}`;
            li.addEventListener("click", function(){
                li.style.opacity = "0";
                bookInfo.style.backgroundColor = li.style.backgroundColor;
                bookInfo.style.color = li.style.color;
                if(myLibrary[counter].read == false) bookInfo.style.color = "goldenrod";
                bookInfo.classList.toggle("move-up");
                overlayInfo.classList.add("active");
            
                bookInfo.innerHTML = myLibrary[counter].info();
                overlayInfo.addEventListener('click', function(){
                    putBackBook(counter);
                });
            });


            library.appendChild(li);
            myLibrary[i].showing = true;
        }
    }
}

function hideForm(){
    form.reset();
    form.classList.remove('active');
    overlayForm.classList.remove('active');
}

function showForm(){
    form.classList.add('active');
    overlayForm.classList.add('active');
}

//For Testing
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 321, false);
addBookToLibrary("Warriors", "Erin Hunter", 123, true);
for(let i = 0; i < 35; i++) {
    addBookToLibrary(i, i+2, i+20, true);
}


showLibrary();
 



//New Book Button
button.addEventListener('click', showForm);

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

//Clicking on overlayForm closes form
overlayForm.addEventListener('click', hideForm);

//Clicking on overlayInfo puts book back on shelf
overlayInfo.addEventListener('click', function(){
    overlayInfo.classList.remove('active');
    overlayInfo.removeEventListener('click', putBackBook);
    bookInfo.classList.toggle("move-up");
})