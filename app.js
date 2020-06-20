//if user adds a note, add it to local storage

showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);    //JSON.pasre is used to convert text into object
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));   
    addTxt.value = "";
    addTitle.value = "";
    //console.log(notesObj);
    showNotes();
});

//function to add background color
function bgColor(){
    document.body.style.backgroundColor = "#008080";
} 
bgColor();

//function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard mx-2 my-3 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">  ${element.text}</p>
                    <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div> ` ;
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Its Empty! Use Add A Note to add notes.`;
    }
}

//function to delete a note
function deleteNote(index) {
    //console.log('Its Deleted', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//searching
let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    
    let inputVal = search.value.toLowerCase();
    //console.log("Input event fired !!",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

/*Further features:
1 Add title
2 Mark a note as important
3 Separate notes by user
*/