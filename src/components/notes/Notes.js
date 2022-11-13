import Note from "./Note";

function Notes({ notes, onAdd, onUpdate, onDelete }) {
  return (
    <main className="content">
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
