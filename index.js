const notesContainer = document.getElementById('app');
const addNotebutton = document.querySelector('.add-note');


getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNotebutton);
});

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

    //Setting the properties of the textarea element
    element.classList.add('note');
    element.value = content;
    element.placeholder = "Enter something";

    element.addEventListener('change', () => {
        updateNote(id, element.value);
    })

    element.addEventListener('dblclick', () => {
        const doDelete = confirm('Are you sure you wish to delete');
        if(doDelete){
            deleteNote(id, element)
        }
    })

    //returns back an text area element 
    return element;
}

function addNote(){

}

function updateNote(id, newContent){
    console.log('updating note ...');
    console.log(id, newContent);
}

function deleteNote(id, content){
    console.log('deleting note ...');
    console.log(id, newContent);
}

