import LoadFileButton from './LoadFileButton';
import { Link } from 'react-router-dom';

function Navigation({ fileHandle, notes, onLoad }) {
  return (
    <nav className="col-1">
      <LoadFileButton fileHandle={fileHandle} onLoad={onLoad} />

      <ul>
        {notes.map((note) => (
          <li key = {note.id}>
            <Link to={`/note/${note.id}`}>{note.text}</Link>
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navigation;
