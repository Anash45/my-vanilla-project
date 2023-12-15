
export function getNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes;
}
export function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function getCategories() {

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    const uniqueCategories = Array.from(new Set(notes.map((note) => note.category)));

    return uniqueCategories;
}

export function filterNotesByCategory(category) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (category == 'all') {
        return notes;
    } else {
        return notes.filter((note) => note.category === category);
        
    }
}