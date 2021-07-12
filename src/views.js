'use strict'
import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes } from './notes';

// returns last updated date formatted for display
const getLastUpdated = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;

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

const renderNotes = () => {
    const notesElement = document.querySelector('#notes');
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    
    notesElement.innerHTML="";

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

export {
    getLastUpdated,
    generateNoteDOM,
    renderNotes,
}