import Note from './Note';
import './Notes.css';
import { useLocation } from 'react-router-dom'
import { findNote } from './notesUtil'; 

function Notes({notes, noteActions}) {
  const path = useLocation().pathname;

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
