'use strict'
import moment from 'moment';
import { getNotes, removeNote, updateNote} from './notes'
import { getLastUpdated } from './views'

const noteTitleElement = document.querySelector('#note-title');
const noteBodyElement = document.querySelector('#note-body');
const noteRemoveButton = document.querySelector('#remove-note');
const noteLastEdited = document.querySelector('#last-edited');
const noteId =  location.hash.substring(1);
let notes = getNotes();

let note = notes.find((note) => note.id === noteId);
console.log("|This note", note);

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
    updateNote(noteId, {title: note.title})
});

noteBodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf();
    updateNote(noteId, {body: note.body})
});

noteRemoveButton.addEventListener('click', (e) => {
    removeNote(noteId);
    location.assign('./index.html');
});

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find((note) => note.id === noteId);
        
        if(!note) {
            location.assign('/index.html');
            return;
        }
        noteTitleElement.value = note.title;
        noteBodyElement.value = note.body;
        noteLastEdited.value = getLastUpdated();
    }
});




