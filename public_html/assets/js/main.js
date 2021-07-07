//Setup temp data objects
//=======================

const notes = getSavedNotes();

//On Startup

renderNotes(notes, filters);

//Event Listeners
//===============

document.querySelector('#create-note').addEventListener('click', (e) => {
    e.preventDefault();
    id = uuidv4();
    notes.push({
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

document.querySelector('#sortOptions').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
});

const now = new Date();
console.log(now.toString());

