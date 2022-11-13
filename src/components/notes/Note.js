import NoteMenu from "./NoteMenu";

function Note({ note, onDelete }) {
    return (
        <div>
            <span style={{marginRight: '10px'}}>
                <NoteMenu note={note} onDelete={onDelete} />
            </span>
            <span >
                {note.id}
            </span>
        </div>
    );
}

export default Note;
