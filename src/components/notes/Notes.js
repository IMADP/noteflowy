import Note from './Note';
import './Notes.css';

function Notes({notes, noteActions}) {
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
