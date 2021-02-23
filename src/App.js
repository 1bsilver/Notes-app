import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  return (
    <div className="footerStyle">
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportantOf = (id) => {
    const note = notes.find(n=> n.id === id)
    const changedNote = {...note, important : !note.important }

   noteService.update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note=> note.id !== id ? note : returnedNote))
    })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        
        window.scrollTo(0,0);  
        setTimeout(() => {
          
          setErrorMessage(null)
        }, 3000)
      setNotes(notes.filter(n => n.id !== id))
    })

    
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      
    }
  
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button className="button-one" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note key={i} note={note} toggleImportance={()=>toggleImportantOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button className="button-three" type="submit">save</button>
      </form>   
      <Footer />
    </div>
  )
}

export default App 