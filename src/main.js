'use strict'

import { createNote } from './notes';
import { setFilters } from './filters';
import { renderNotes } from './views';

//Setup temp data objects
//=======================

//On Startup

renderNotes();

//Event Listeners
//===============

document.querySelector('#create-note').addEventListener('click', (e) => {
    e.preventDefault();
    const id = createNote();
    location.assign(`/note.html#${id}`); 
});

document.querySelector('#inp-search').addEventListener('input', (e) => {
    setFilters({searchText: e.target.value});
    renderNotes();
});

document.querySelector('#sort-by').addEventListener('change', (e) => {
    setFilters({sortBy: e.target.value});
    renderNotes();
});

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        renderNotes();
    }
});






