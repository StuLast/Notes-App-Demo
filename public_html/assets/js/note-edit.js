const noteTitleElement = document.querySelector('#note-title');
const noteBodyElement = document.querySelector('#note-body');
const noteRemoveButton = document.querySelector('#remove-note');
const noteId =  location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find(function (note) {
    return note.id === noteId;
});

if(note === undefined) {
    location.assign('/index.html');
}

noteTitleElement.focus();

noteTitleElement.value = note.title;
noteBodyElement.value = note.body;

noteTitleElement.addEventListener('input', (e) => {
    note.title =  e.target.value;
    setSavedNotes(notes);
});

noteBodyElement.addEventListener('input', (e) => {
    note.body = e.target.value
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

        note = notes.find(function (note) {
            return note.id === noteId;
        });
        
        if(note === undefined) {
            location.assign('/index.html');
        }

        noteTitleElement.value = note.title;
        noteBodyElement.value = note.body;
    }
});




