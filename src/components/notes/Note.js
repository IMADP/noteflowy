import NoteMenu from "./NoteMenu";

function Note({ note, onDelete }) {
    return (
        <div>
            <span>
                <NoteMenu note={note} onDelete={onDelete} />
            </span>
            <span >
                {note.id}
            </span>
        </div>
    );
}

export default Note;
