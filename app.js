
const noteContainer = document.querySelector('#app')
const addNoteBtn = document.querySelector('.add-note')

// Save notes in local storage
function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// Load notes from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem('notes') || '[]')
}


// Create a note from given data for DOM
function createNoteElement(id, content) {
  const noteElement = document.createElement('textarea')
  noteElement.classList.add('note-base', 'note')
  noteElement.id = id
  noteElement.value = content
  return noteElement
}

