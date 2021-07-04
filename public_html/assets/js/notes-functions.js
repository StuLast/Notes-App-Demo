//CRUD Operations
//===============

//Import existing notes from local storage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes');
    if(notesJSON != null) {
        return JSON.parse(notesJSON);
    } else {
        return [];
    }
}

const setSaveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Rendering
//=========

const renderNote = (note) => {
    const newNoteDiv = document.createElement('div');
    newNoteDiv.className = "note";
    let html = "";
    html += `<h3>${note.title > 0 ? note.title: "Unnamed Note"}</h3>`;
    html += `<p>${note.body}</p>`;
    newNoteDiv.innerHTML = html;
    return newNoteDiv
};

const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });
    document.querySelector('#notes').innerHTML = "";
    filteredNotes.forEach((note) => {
        document.querySelector('#notes').appendChild(renderNote(note));
    });
};