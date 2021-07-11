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
    const noteElement = document.createElement('a');
    const textElement = document.createElement('p');
    const statusElement = document.createElement('p');

    noteElement.classList.add('list-item');
    textElement.classList.add('list-item__title');
    statusElement.classList.add('list-item__sub-title');

    textElement.textContent = note.title ? note.title : "Untitled Note";
    noteElement.setAttribute('href', `/note.html#${note.id}`);
    noteElement.appendChild(textElement);

    statusElement.textContent = getLastUpdated();
    noteElement.appendChild(statusElement);
    
    return noteElement;
};

const renderNotes = (notes, filters) => {
    const notesElement = document.querySelector('#notes');
    notes = sortNotes(notes, filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    notesElement.innerHTML = "";

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            notesElement.appendChild(generateNoteDOM(note));
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-message');
        emptyMessage.textContent = "There are no notes to show";
        notesElement.appendChild(emptyMessage);
    }
};