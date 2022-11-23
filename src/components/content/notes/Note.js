import React, { useRef, useState } from 'react';
import NoteMenu from './NoteMenu';
import Editable from '../../ui/Editable';
import Details from './Details';
import { Link } from "react-router-dom";
import './Note.css';
import { TriangleRightIcon, TriangleDownIcon, FrameIcon } from '@radix-ui/react-icons';

function Note({ note, parent, noteActions }) {
    const inputRef = useRef();
    const [showDetailEdit, setShowDetailEdit] = useState(false);

    const handleDetailUpdate = (e) => {
        noteActions.onUpdate({ ...note, details: e.target.value })
        setShowDetailEdit(false);
    }

    return (
        <div className="Note">
            <NoteMenu
                note={note}
                parent={parent}
                noteActions={noteActions}
                handleAddDetails={() => setShowDetailEdit(true)}
            />

            <Link to={`/note/${note.id}`}>
                <button type="button">
                    <FrameIcon />
                </button>
            </Link>

            {note.children.length === 0 &&
                <TriangleRightIcon color='lightGray' />
            }

            {note.children.length > 0 &&
                <button onClick={() => noteActions.onUpdate({ ...note, collapsed: !note.collapsed })} >
                    {note.collapsed ? <TriangleRightIcon /> : <TriangleDownIcon />}
                </button>
            }

            <Editable
                className={note.completed ? 'completed' : 'uncompleted'}
                text={note.text}
                childRef={inputRef}
                type="input"
            >
                <input
                    ref={inputRef}
                    type="text"
                    name="task"
                    value={note.text}
                    onChange={(e) => noteActions.onUpdate({ ...note, text: e.target.value })}
                />
            </Editable>

            {(showDetailEdit || note.details) &&
                <Details
                    details={note.details}
                    initialEditing={showDetailEdit}
                    onChange={handleDetailUpdate}
                    onClickOutside={() => setShowDetailEdit(false)}
                />
            }

            {!note.collapsed && <ul className='NotesList'>
                {note.children.map((n) => (
                    <li key={n.id}>
                        <Note note={n} parent={note} noteActions={noteActions} />
                    </li>
                ))}
            </ul>
            }
            
        </div>
    );
}

export default Note;
