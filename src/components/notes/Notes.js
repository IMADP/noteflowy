import Note from './Note';
import './Notes.css';
import { useLocation } from 'react-router-dom'

function Notes({notes, noteActions}) {
  const path = useLocation().pathname;

  /**
   * TODO: This method is copy pasted from App.js and should be shared
   * 
   * @param {*} notes 
   * @param {*} id 
   * @returns note
   */
  function findNote(notes, id) {
    if (notes) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          return notes[i];
        }
        var found = findNote(notes[i].children, id);

        if (found) {
          return found;
        }
      }
    }
  }

  // filter note by path
  if(path !== '/') {
    const note = findNote(notes, path.substring(1));
    
    if(note) {
      notes = [note];
    }
  }
  
  return (
    <main className="Notes content">
      <article>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Note note={note} noteActions={noteActions} />
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
} 

export default Notes;
