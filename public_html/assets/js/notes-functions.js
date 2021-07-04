//CRUD Operations
//===============

//Import existing notes from local storage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON != null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    }
}

const setSaveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Rendering
//=========

const generateNoteDOM = (note) => {
    const noteDiv = document.createElement('div');
    const noteHeadingDiv = document.createElement('div');
    const noteHeading = document.createElement('span');
    const noteContent = document.createElement('p');
    const button = document.createElement('button');

    noteDiv.className = "note";

    noteHeading.textContent = note.title > 0 ? note.title: "Unnamed Note"
    noteContent.textContent = note.body;
    button.textContent = 'x'
    
    noteHeadingDiv.appendChild(noteHeading);
    noteHeadingDiv.appendChild(button);

    noteDiv.appendChild(noteHeadingDiv);
    noteDiv.appendChild(noteContent);
    return noteDiv;
};

const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });
    document.querySelector('#notes').innerHTML = "";
    filteredNotes.forEach((note) => {
        document.querySelector('#notes').appendChild(generateNoteDOM(note));
    });
};