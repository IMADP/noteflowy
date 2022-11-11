import Note from './Note';

function Sidebar({ notes, onDelete, onAdd }) {
  return (
    <nav className="col-1">
      
      <ul>
        {notes.map((note) => (
          <li key = {note.id}>
            <Note note={note} onDelete={onDelete} />
          </li>
        ))}
      </ul>

      <button onClick={() => onAdd({text: 'new'})}>Add Note</button>
    </nav>
  );
} 

export default Sidebar;
