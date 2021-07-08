'use srict'

//State
const filters = {
    searchText: '',
    sortBy: 'byEdited'
};

//CRUD Operations
//===============

//Import existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON != null ? JSON.parse(notesJSON) : [];
    } catch (e) {
        console.log('Local data storage corrupted and lost');
        return [];
    }
};

// returns last updated date formatted for display
const getLastUpdated = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;

// save all notes
const setSavedNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

//Remove a note
const removeNote =  (noteID) => {
    const noteIndex = notes.findIndex((note) => note.id === noteID);
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
};

//SORT OPERATIONS
//===============

//  Sort notes by selected option 
const sortNotes = (notes, sortType) => {
    switch(sortType) {
        case "byEdited":
            return sortByEdited(notes);
        case "byCreated":
            return sortByCreated(notes);
        case "byAlphabet":
            return sortByAlphabet(notes);
        default:
            return sortByEdited(notes);
    };
};

const sortByEdited = (notes) => {
    return notes.sort((a, b) => {
        if(a.updatedAt > b.updatedAt) {
            return -1;
        } else if (a.updatedAt < b.updatedAt) {
            return 1;
        } else {
            return 0;
        }
    });
}

const sortByCreated = (notes) => {
    return notes.sort((a, b) => {
        if(a.createdAt > b.createdAt) {
            return 1;
        } else if (a.createdAt < b.createdAt) {
            return -1;
        } else {
            return 0;
        }
    });
};

const sortByAlphabet = (notes) => {
    return notes.sort((a, b) => {
        if(a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    });
};

//RENDERING
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

    noteHeading.textContent = note.title ? note.title : "Untitled Note";
    noteHeading.setAttribute('href', `/note.html#${note.id}`);
    button.textContent = 'x';
    
    noteHeadingDiv.appendChild(noteHeading);
    noteHeadingDiv.appendChild(button);

    noteDiv.appendChild(noteHeadingDiv);
    return noteDiv;
};

const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    document.querySelector('#notes').innerHTML = "";
    filteredNotes.forEach((note) => {
        document.querySelector('#notes').appendChild(generateNoteDOM(note));
    });
};