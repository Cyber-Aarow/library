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