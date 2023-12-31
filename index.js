const notesContainer = document.getElementById('app');
const addNotebutton = document.querySelector('.add-note');


getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNotebutton);
});

addNotebutton.addEventListener('click', () => addNote());


//Gets all existing notes from the localstorage
function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

//Saves notes to the localstorage
function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

//Creates one textarea element
function createNoteElement(id, content){
    const element = document.createElement('textarea');

    //box shadow property
    let hue = Math.floor(Math.random() * 360) + ", ";
    let saturation = "100%, ";
    let lightness = "80%";

    let bgColor = "hsl(" + hue + saturation + lightness + ")"

    /*console.log(bgColor)*/

    //Setting the properties of the textarea element
    element.classList.add('note');
    element.style.backgroundColor = bgColor;
    element.style.boxShadow = '0px 0px 2px rgb(52, 180, 238)';
    element.value = content;
    element.placeholder = "Enter something";

    element.addEventListener('change', () => {
        updateNote(id, element.value);
    });

    element.addEventListener('dblclick', () => {
        const doDelete = confirm('Are you sure you wish to delete');
        if(doDelete){
            deleteNote(id, element)
        }
    });

    //returns back an text area element 
    return element;
}

//Creates a new note  
function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNotebutton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}

