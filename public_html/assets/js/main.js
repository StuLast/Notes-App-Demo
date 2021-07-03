//Setup temp data objects
//=======================

const notes = [
    {
        title: 'New Ideas',
        body: 'Time to come up with new ideas'
    },
    {
        title: 'New Work',
        body: 'Time to work on those new ideas'
    },
    {
        title: 'Get Income',
        body: 'Time to generate income from those new ideas'
    },
];

const filters = {
    searchText: '',
}

//Dynamic data rendering
//======================

const renderNote = (note) => {
    const newNoteDiv = document.createElement('div');
    newNoteDiv.className = "note";
    let html = "";
    html += `<h3>${note.title}</h3>`;
    html += `<p>${note.body}</p>`;
    newNoteDiv.innerHTML = html;
    document.querySelector('#notes').appendChild(newNoteDiv);
}

const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });
    document.querySelector('#notes').innerHTML = "";
    filteredNotes.forEach((note) => {
        renderNote(note);
    });
};

//Event Listeners

document.querySelector('#inp-search').addEventListener('input', (e) => {
    e.preventDefault();
    filters.searchText = e.target.value
    renderNotes(notes, filters);
})

document.querySelector('#form-add-name').addEventListener('submit', (e) => {
    e.preventDefault();
    const dataSource = e.target.elements.firstName
    console.log(dataSource.value);
    dataSource.value = "";
})

//On Startup

renderNotes(notes, filters);