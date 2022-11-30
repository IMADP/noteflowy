import { FrameIcon, TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Link } from "react-router-dom";
import Menu from './Menu';
import './Note.css';
import NoteDetails from './NoteDetails';
import NoteText from './NoteText';

function Note({ note, parent, noteActions }) {

    return (
        <div className="Note">
            <Menu
                note={note}
                parent={parent}
                noteActions={noteActions}
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

            <NoteText note={note} parent={parent} noteActions={noteActions} />
            <NoteDetails note={note} noteActions={noteActions} />

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
