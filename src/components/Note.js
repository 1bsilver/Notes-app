import React from 'react'

const Note = ({ note, toggleImportance }) => {

  const label=note.important ? 'make not important' : 'make important'
  return (<div className="noteBg">    <ul>    <li className='note'>{note.content} 
    <button className="button-two" onClick={toggleImportance}>{label}</button></li>
    </ul>
    </div>

  )

}

export default Note