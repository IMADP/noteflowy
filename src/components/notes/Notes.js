import Note from './Note';
import './Notes.css';

function Notes({ notes, onAdd, onAddSubNote, onDuplicate, onUpdate, onDelete }) {
  return (
    <main className="Notes content">
      <article>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Note note={note} onAdd={onAdd} onAddSubNote={onAddSubNote} onDuplicate={onDuplicate} onUpdate={onUpdate} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
} 

export default Notes;
