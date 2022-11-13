import SidebarNote from './SidebarNote';

function Sidebar({ fileHandle, notes, onAdd, onLoad }) {
  return (
    <nav className="col-1">
      <button className='block' onClick={onLoad}>
        { fileHandle !== null ? fileHandle.name : 'Load File'}
      </button>  
   
      <ul>
        {notes.map((note) => (
          <li key = {note.id}>
            <SidebarNote note={note}  />
          </li>
        ))}
      </ul>

        {fileHandle !== null  && <button className='block' onClick={() => onAdd({text: 'New Note'})}>Add Note</button>}
      
    </nav>
  );
} 

export default Sidebar;
