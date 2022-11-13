import Note from "./Note";

function Notes({ notes, onDelete }) {
  return (
    <main className="content">
      <article>
          {notes.map((note) => (
            <div key = {note.id}>
              <Note note={note} onDelete={onDelete} />
            </div>
          ))}
      </article>
    </main>
  );
} 

export default Notes;
