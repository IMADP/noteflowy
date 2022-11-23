import NavigationLoadButton from './NavigationLoadButton';
import NavigationLink from './NavigationLink';

function Navigation({ fileHandle, notes, onLoad }) {
  return (
    <nav className="col-1">
      <NavigationLoadButton fileHandle={fileHandle} onClick={onLoad} />

      <ul>
        {notes.map((note) => (
          <li key = {note.id}>
            <NavigationLink note={note}  />
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Navigation;
