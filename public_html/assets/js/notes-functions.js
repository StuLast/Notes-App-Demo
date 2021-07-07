//State
const filters = {
    searchText: '',
    sortBy: 'byCreated',
}

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

const setSavedNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Remove a note
const removeNote = function (noteID) {
    const noteIndex = notes.findIndex((note) => {
        return note.id === noteID;
    });
    console.log(noteIndex);
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};

//Rendering
//=========

const generateNoteDOM = (note) => {
    const noteDiv = document.createElement('div');
    const noteHeadingDiv = document.createElement('div');
    const noteHeading = document.createElement('a');
    const noteContent = document.createElement('p');
    const button = document.createElement('button');

    noteDiv.className = "note";

    button.addEventListener('click', (e) => {
        removeNote(note.id);
        setSavedNotes(notes);
        renderNotes(notes, filters);
    })

    noteHeading.textContent = note.title;
    noteHeading.setAttribute('href', `/note.html#${note.id}`);
    button.textContent = 'x'
    
    noteHeadingDiv.appendChild(noteHeading);
    noteHeadingDiv.appendChild(button);

    noteDiv.appendChild(noteHeadingDiv);
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