console.log("JS reporting for duty");


const notes = [
    {
        title: 'Note B',
        body: 'The Audio Programmer Sucks'
    },
    {
        title: 'Note 2',
        body: 'Josh Sucks'
    },
    {
        title: 'Note A',
        body: 'Josh is dishonest'
    },
];

const getNotes = (notes) => {
    notes.forEach((note) => {
        renderNote(note);
    })
}

const renderNote = (note) => {
    const newNoteDiv = document.createElement('div');
    let html = "";
    html += `<h3>${note.title}</h3>`;
    html += `<p>${note.body}</p>`;
    newNoteDiv.innerHTML = html;
    document.querySelector('#app').appendChild(newNoteDiv);
}

getNotes(notes);