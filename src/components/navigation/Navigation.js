import { Link } from 'react-router-dom';
import LoadFileButton from './LoadFileButton';

function Navigation({ fileHandle, rootNote, onLoad }) {
  return (
    <nav className="col-1">
      <LoadFileButton fileHandle={fileHandle} onLoad={onLoad} />

      <ul>
        {rootNote.children && rootNote.children.map((note) => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}><span>{note.text.replace(/<[^>]+>/g, '')}</span></Link>
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navigation;
