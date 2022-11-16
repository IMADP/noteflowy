import Note from './Note';
import './Notes.css';

function Notes({ notes, onAdd, onUpdate, onDelete }) {
  return (
    <main className="Notes content">
      <article>
          {notes.map((note) => (
            <div key = {note.id}>
              <Note note={note} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete} />
            </div>
          ))}
      </article>
    </main>
  );
} 

export default Notes;
