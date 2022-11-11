import Note from "./Note";

function Notes({ notes, onDelete }) {
  return (
    <main className="content">
      <article>
        <ul>
          {notes.map((note) => (
            <li key = {note.id}>
              <Note note={note} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
} 

export default Notes;
