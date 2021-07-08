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






