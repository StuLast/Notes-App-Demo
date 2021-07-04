//Setup temp data objects
//=======================

const notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byCreated',
}

//On Startup

renderNotes(notes, filters);

//Event Listeners
//===============

document.querySelector('#create-note').addEventListener('click', (e) => {
    e.preventDefault();
    notes.push({
        title: '',
        body: ''
    });
    setSaveNotes(notes);
    renderNotes(notes, filters);
});

document.querySelector('#inp-search').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters);
});

document.querySelector('#sortOptions').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
})

