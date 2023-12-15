import { getNotes, filterNotesByCategory, saveNotes } from './helpers.js';
const noteMsg = document.getElementById('noteMsg');
export function displayNotes(filteredNotes) {
    
    const showNotesDiv = document.getElementById('showNotes');
    const allNotes = getNotes();

    showNotesDiv.innerHTML = '';

    if (!filteredNotes || filteredNotes.length === 0) {
        if (allNotes.length === 0) {
            showNotesDiv.innerHTML = `<div class="error">No notes found.</div>`;
        } else {
            allNotes.forEach((note) => {
                const noteDiv = document.createElement('div');
                noteDiv.innerHTML = `<div class="note-card"><h3 class="note-title">${note.title}</h3> <span class="note-category">${note.category}</span> <p class="note-desc">${truncateDescription(note.description)}...(<a href="details.html?id=${note.id}">Read More</a>)</p><div class="note-btns"><button class="editBtn" note-id="${note.id}">Edit Note</button><button class="dltBtn" note-id="${note.id}">Delete Note</button></div></div>`;
                noteDiv.classList.add('note');
                showNotesDiv.appendChild(noteDiv);
            });
            initializeEditBtn();
            initializeDltBtn();
        }
    } else {
        filteredNotes.forEach((note) => {
            const noteDiv = document.createElement('div');
            noteDiv.innerHTML = `<div class="note-card"><h3 class="note-title">${note.title}</h3> <span class="note-category">${note.category}</span> <p class="note-desc">${truncateDescription(note.description)}...(<a href="details.html?id=${note.id}">Read More</a>)</p><div class="note-btns"><button class="editBtn" note-id="${note.id}">Edit Note</button><button class="dltBtn" note-id="${note.id}">Delete Note</button></div></div>`;
            noteDiv.classList.add('note');
            showNotesDiv.appendChild(noteDiv);
        });
        initializeEditBtn();
        initializeDltBtn();
    }
}
function truncateDescription(description) {
    const maxLength = 20;
    if (description.length > maxLength) {
        return `${description.substring(0, maxLength)}`;
    } else {
        return description;
    }
}
export function initializeEditBtn() {

    const editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', () => {
            const noteId = editButton.getAttribute('note-id');
            populateEditForm(noteId);
        });
    });
}
export function initializeDltBtn() {
    const deleteButtons = document.querySelectorAll('.dltBtn');
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
            const noteId = deleteButton.getAttribute('note-id');
            const confirmation = confirm('Are you sure you want to delete this note?');

            if (confirmation) {
                deleteNote(noteId);
            }
        });
    });
}
export function renderCategoryFilter() {
    
    const categoryFilter = document.getElementById('categoryFilter');
    const notes = getNotes();

    const uniqueCategories = Array.from(new Set(notes.map((note) => note.category)));

    categoryFilter.innerHTML = '';

    const defaultOption = document.createElement('option');
    if (uniqueCategories.length > 0) {
        defaultOption.value = 'all';
        defaultOption.textContent = 'All Notes!';
        categoryFilter.appendChild(defaultOption);

        uniqueCategories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    } else {
        defaultOption.value = '';
        defaultOption.textContent = 'No categories yet!';
    }
}

export function populateEditForm(noteId) {
    const noteToEdit = getNotes().find((note) => note.id == noteId);
    const editNoteForm = document.getElementById('editNote');
    const addNoteForm = document.getElementById('addNote');

    if (noteToEdit) {
        document.getElementById('edit_id').value = noteToEdit.id;
        document.getElementById('edit_title').value = noteToEdit.title;
        document.getElementById('edit_description').value = noteToEdit.description;
        document.getElementById('edit_category').value = noteToEdit.category;
        addNoteForm.style.display = 'none';
        editNoteForm.style.display = "block";
    }
}
function deleteNote(noteId) {
    const notes = getNotes();
    const indexToDelete = notes.findIndex((note) => note.id == noteId);
    console.log(1);
    if (indexToDelete !== -1) {
        notes.splice(indexToDelete, 1);
        saveNotes(notes);
        noteMsg.innerHTML = `Note Deleted Successfully!`;
        noteMsg.classList.add('success');
        renderApp();
    }
}
export function showNoteDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('id');

    if (!noteId) {
        window.location.href = 'index.html';
    } else {
        const noteDetails = getNoteDetails(noteId);

        if (!noteDetails) {
            document.getElementById('note-details').innerHTML = `<div class="error">Invalid Note ID</div><a href="index.html" class="detailsBtn">Go Back</a>`;
        } else {
            displayNoteDetails(noteDetails);
        }
    }
};

function getNoteDetails(noteId) {
    const notes = getNotes();
    return notes.find((note) => note.id == noteId);
}

function displayNoteDetails(noteDetails) {
    document.getElementById('nd_title').textContent = noteDetails.title;
    document.getElementById('nd_category').textContent = `Category: ${noteDetails.category}`;
    document.getElementById('nd_description').textContent = noteDetails.description;
}
document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const addNoteForm = document.getElementById('addNote');
    const editNoteForm = document.getElementById('editNote');

    addNoteBtn.addEventListener('click', () => {
        editNoteForm.style.display = 'none';
        addNoteForm.style.display = 'block';
    });
    const categoryFilter = document.getElementById('categoryFilter');

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;

        if (selectedCategory) {
            const filteredNotes = filterNotesByCategory(selectedCategory);
            displayNotes(filteredNotes);
        } else {
            displayNotes();
        }
    });
});
export function renderApp() {
    renderCategoryFilter();
    displayNotes();
}