import Note from "./Note";

function Notes({ notes, onAdd, onDelete }) {
  return (
    <main className="content">
      <article>
          {notes.map((note) => (
            <div key = {note.id}>
              <Note note={note} onAdd={onAdd} onDelete={onDelete} />
            </div>
          ))}
      </article>
    </main>
  );
} 

export default Notes;
