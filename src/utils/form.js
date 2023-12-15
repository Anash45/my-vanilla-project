import validator from 'validator';
import { getNotes, saveNotes } from './helpers.js';
import { renderCategoryFilter, displayNotes } from './dom.js';

const formMsg = document.getElementById('formMsg');
export function initializeAddForm() {
  const addNoteForm = document.getElementById('addNote');

  addNoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (validateForm(title, description, category)) {
      const newNote = createNewNote(title, description, category);

      saveNote(newNote);

      clearFormFields();
      renderCategoryFilter();
      displayNotes();
      formMsg.innerHTML = `Note Added Successfully!`;
      formMsg.classList.add('success');
      formMsg.classList.remove('error');
      addNoteForm.style.display = "none";
    }else{
      formMsg.innerHTML = `All fields are required!`;
      formMsg.classList.remove('success');
      formMsg.classList.add('error');
    }
  });
}

function validateForm(title, description, category) {
  
  if (validator.isEmpty(title) || validator.isEmpty(description) || validator.isEmpty(category)) {
    console.log('Please fill in all fields.');
    return false;
  }

  
  return true;
}

function createNewNote(title, description, category) {
  const notes = getNotes();
  const lastNote = notes[notes.length - 1];

  const newNote = {
    id: lastNote ? lastNote.id + 1 : 1, 
    title: title,
    description: description,
    category: category,
  };

  return newNote;
}
export function initializeEditForm() {
  const editNoteForm = document.getElementById('editNote');

  editNoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const editId = document.getElementById('edit_id').value;
    const editTitle = document.getElementById('edit_title').value;
    const editDescription = document.getElementById('edit_description').value;
    const editCategory = document.getElementById('edit_category').value;

    if (validateForm(editTitle, editDescription, editCategory)) {
      updateNote(editId, editTitle, editDescription, editCategory);

      clearFormFields();
      renderCategoryFilter();
      displayNotes();
      formMsg.innerHTML = `Note Updated Successfully!`;
      formMsg.classList.add('success');
      formMsg.classList.remove('error');
      editNoteForm.style.display = "none";
    }else{
      formMsg.innerHTML = `All fields are required!`;
      formMsg.classList.remove('success');
      formMsg.classList.add('error');
    }
  });
}
function updateNote(editId, editTitle, editDescription, editCategory) {
  const notes = getNotes();
  const indexToUpdate = notes.findIndex((note) => note.id == editId);

  if (indexToUpdate !== -1) {
    notes[indexToUpdate] = {
      id: Number(editId),
      title: editTitle,
      description: editDescription,
      category: editCategory,
    };

    saveNotes(notes);
  }
}
function saveNote(newNote) {
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
}

function clearFormFields() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('category').value = '';

  document.getElementById('edit_id').value = '';
  document.getElementById('edit_title').value = '';
  document.getElementById('edit_description').value = '';
  document.getElementById('edit_category').value = '';
}