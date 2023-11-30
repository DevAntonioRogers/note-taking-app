window.addEventListener("load", function () {
  const saveNotes = JSON.parse(localStorage.getItem("notes")) || []
  const noteList = document.getElementById("noteList")

  saveNotes.forEach(function (saveNote) {
    const noteItem = createNoteItem(saveNote)
    noteList.appendChild(noteItem)
  })
})

function createNote() {
  const noteText = document.getElementById("note").value

  if (noteText.trim() === "") {
    return
  }

  const fontSize = document.getElementById("fontSize").value + "px";
  const isBold = document.getElementById("bold").checked;
  const isItalic = document.getElementById("italic").checked;
  const textColor = document.getElementById("color").value;

  const noteItem = createNoteItem({
    text: noteText,
    fontSize: fontSize,
    isBold: isBold,
    isItalic: isItalic,
    textColor: textColor,
  })

  const noteList = document.getElementById("noteList")
  noteList.appendChild(noteItem)

  document.getElementById("note").value = "";
  document.getElementById("fontSize").value = "16";
  document.getElementById("bold").checked = false;
  document.getElementById("italic").checked = false;
  document.getElementById("color").value = "#000000";

  saveNoteToLocalStorage(noteItem)
}

function createNoteItem(noteData) {
  const noteItem = document.createElement("div")
  noteItem.classList.add("note")
  noteItem.style.fontSize = noteData.fontSize

  if (noteData.isBold) {
    noteItem.style.fontWeight = "bold"
  }
  if (noteData.isItalic) {
    noteItem.style.fontStyle = "italic"
  }

  noteItem.style.color = noteData.textColor

  const timeStamp = new Date().toLocaleString()

  noteItem.innerHTML = `<p>${noteData.text}</p>
  <p class="timestamp">Posted on: ${timeStamp}</p>
  `

  const editControls = document.createElement("div")
  editControls.classList.add("edit-controls")
  editControls.innerHTML = `
  <button onClick="editNote(this)">Edit</button>
  <button onClick="deleteNote(this)">Delete</button>
  `;

  noteItem.appendChild(editControls)

  return noteItem
}

function editNote(editButton) {
  const noteItem = editButton.parentElement.parentElement

  const noteText = noteItem.querySelector("p:first-child").textContent

  document.getElementById("note").value = noteText

  deleteNote(editButton)
}

function deleteNote(deleteButton) {
  const noteItem = deleteButton.parentElement.parentElement
  noteItem.remove()

  removeNoteFromLocalStroage(noteItem)
}

function saveNoteToLocalStorage(noteItem) {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const noteText = noteItem.querySelector("p:first-child").textContent;
  const fontSize = noteItem.style.fontSize;
  const isBold = noteItem.style.fontWeight === "bold";
  const isItalic = noteItem.style.fontStyle === "italic";
  const textColor = noteItem.style.color;

  const newNote = {
    text: noteText,
    fontSize: fontSize,
    isBold: isBold,
    isItalic: isItalic,
    textColor: textColor,
  }

  savedNotes.push(newNote)
  localStorage.setItem("notes", JSON.stringify(savedNotes))
}

function removeNoteFromLocalStroage(noteItem) {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || []
  const noteText = noteItem.querySelector("p:first-child").textContent

  const index = savedNotes.findIndex((note) => note.text === noteText)

  if (index !== -1) {
    savedNotes.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(savedNotes))
  }
}

document.getElementById("postNote").addEventListener("click", createNote)