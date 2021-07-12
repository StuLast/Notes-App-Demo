'use strict'

import moment from 'moment';
import uuidv4 from 'uuid/v4';

let notes = [];

//Import existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON != null ? JSON.parse(notesJSON) : [];
    } catch (e) {
        console.log('Local data storage corrupted and lost');
        return [];
    }
};

//Expose notes from module
const getNotes = () => notes;

// save all notes
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

//Create a note
const createNote = () => {
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id,
        title: '',
        body: ''
    });
    saveNotes();
    return id;
}

const updateNote = (id, updates = {}) =>  {
    const note = notes.find((note) => note.id = id);
    if(!note) {
        return;
    }

    if(typeof updates.title === 'string') {
        note.title = updates.title;
        note.updatedAt = moment().valueOf();
    }

    if(typeof updates.body === 'string') {
        note.body = updates.body;
        note.updatedAt = moment().valueOf();
    }
    saveNotes();
}

//Remove a note
const removeNote =  (noteID) => {
    const noteIndex = notes.findIndex((note) => note.id === noteID);
    if(noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
};

//  Sort notes by selected option 
const sortNotes = (sortType) => {
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

const sortByEdited = () => {
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

const sortByCreated = () => {
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

const sortByAlphabet = () => {
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



notes = loadNotes();

export {
    getNotes,
    createNote,
    removeNote,
    sortNotes, 
    updateNote
}

