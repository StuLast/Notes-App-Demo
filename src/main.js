'use strict'
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import {
    filters, 
    getSavedNotes,
    setSavedNotes,
    renderNotes} from './notes-functions';

//Setup temp data objects
//=======================

const notes = getSavedNotes();

//On Startup

renderNotes(notes, filters);

//Event Listeners
//===============

document.querySelector('#create-note').addEventListener('click', (e) => {
    e.preventDefault();
    const id = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id,
        title: '',
        body: ''
    });
    setSavedNotes(notes);
    location.assign(`/note.html#${id}`);  
});

document.querySelector('#inp-search').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters);
});

document.querySelector('#sort-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
});






