import { renderApp,showNoteDetails } from './utils/dom.js';
import { initializeAddForm, initializeEditForm } from './utils/form.js';

export function initializeApp() {
    const homepage = document.getElementById('homepage');
    const detailsPage = document.getElementById('detailsPage');
    if (homepage) {
        renderApp();

        initializeEditForm();
        initializeAddForm();
    } else {
        showNoteDetails();
    }
}
