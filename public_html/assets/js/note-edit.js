'use strict'

const noteTitleElement = document.querySelector('#note-title');
const noteBodyElement = document.querySelector('#note-body');
const noteRemoveButton = document.querySelector('#remove-note');
const noteLastEdited = document.querySelector('#last-edited');
const noteId =  location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find((note) => note.id === noteId);

if(!note) {
    location.assign('/index.html');
}

noteTitleElement.focus();

noteTitleElement.value = note.title;
noteBodyElement.value = note.body;
noteLastEdited.textContent = getLastUpdated(note.updatedAt);

noteTitleElement.addEventListener('input', (e) => {
    note.title =  e.target.value;
    note.updatedAt = moment().valueOf();
    setSavedNotes(notes);
});

noteBodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf();
    setSavedNotes(notes);
});

noteRemoveButton.addEventListener('click', (e) => {
    removeNote(noteId);
    setSavedNotes(notes);
    location.assign('./index.html');
});

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue);

        note = notes.find((note) => note.id === noteId);
        
        if(!note) {
            location.assign('/index.html');
        }

        noteTitleElement.value = note.title;
        noteBodyElement.value = note.body;
        noteLastEdited.value = getLastUpdated();
    }
});




