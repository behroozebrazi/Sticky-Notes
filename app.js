
const noteContainer = document.querySelector('#app')
const addNoteBtn = document.querySelector('.add-note')

addNoteBtn.addEventListener('click', () => addNote())

// Add notes to DOM
getNotes().forEach(note => {
  const noteElement = createNoteElement(note.id, note.content)
  noteContainer.insertBefore(noteElement, addNoteBtn)
})

// Save notes in local storage
function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// Load notes from local storage
function getNotes() {
  return JSON.parse(localStorage.getItem('notes') || '[]')
}

// Add a new empty note to local storage and DOM
function addNote() {
  const noteItem = { id: Math.floor(Math.random() * 1000000), content: '' }
  const newNoteElement = createNoteElement(noteItem.id, noteItem.content)
  noteContainer.insertBefore(newNoteElement, addNoteBtn)
  newNoteElement.focus()
  const notes = getNotes()
  notes.push(noteItem)
  saveNotes(notes)
}

// Update content of a note
function updateNote(id, newContent) {
  const notes = getNotes()
  const note = notes.filter(item => item.id === id)[0]
  note.content = newContent
  saveNotes(notes)
}

// Delete a note from local storage and DOM
function deleteNote(id, element) {
  const notes = getNotes().filter(item => item.id !== id)
  saveNotes(notes)
  noteContainer.removeChild(element)
}

// Create a note from given data for DOM
function createNoteElement(id, content) {
  const noteElement = document.createElement('textarea')
  noteElement.classList.add('note-base', 'note')
  noteElement.id = id
  noteElement.value = content
  noteElement.addEventListener('change', () => updateNote(id, noteElement.value))
  noteElement.addEventListener('dblclick', () => deleteNote(id, noteElement))
  return noteElement
}
