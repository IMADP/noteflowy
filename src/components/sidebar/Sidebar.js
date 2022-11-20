import SidebarNote from './SidebarNote';

function Sidebar({ fileHandle, notes, onLoad }) {
  return (
    <nav className="col-1">
      <button className='Button' onClick={onLoad}>
        {fileHandle !== null ? 'Switch File' : 'Load File'}
      </button>  
   
      <ul>
        {notes.map((note) => (
          <li key = {note.id}>
            <SidebarNote note={note}  />
          </li>
        ))}
      </ul>

    </nav>
  );
}

export default Sidebar;
