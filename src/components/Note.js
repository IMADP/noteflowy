
function Note({note, onDelete}) {
    return (
        <>
            <div>{note.text}</div>
            <button onClick={() => onDelete(note.id)}>X</button>
        </>
    );
  } 
  
  export default Note;
  