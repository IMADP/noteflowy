import { FrameIcon, TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import React from 'react';
import ContentEditable from "react-contenteditable";
import { Link } from "react-router-dom";
import Menu from './Menu';
import './Note.css';
import classNames from 'classnames';

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

            {note.link !== null &&
                <a href={note.link} target="#blank">
                    <ContentEditable
                        style={{ display: 'inline' }}
                        tagName='span'
                        spellCheck="false"
                        className={classNames({
                            completed: note.completed,
                            locked: note.locked
                        })}
                        html={note.text}
                        disabled={note.locked}
                        onChange={(e) => noteActions.onUpdate({ ...note, text: e.target.value })}
                    />
                </a>
            }

            {note.link === null &&
                <ContentEditable
                    style={{ display: 'inline' }}
                    tagName='span'
                    spellCheck="false"
                    className={classNames({
                        completed: note.completed,
                        locked: note.locked
                    })}
                    html={note.text}
                    disabled={note.locked}
                    onChange={(e) => noteActions.onUpdate({ ...note, text: e.target.value })}
                />
            }

            {note.showDetails &&
                <ContentEditable
                    tagName='div'
                    className={classNames({
                        details: true,
                        locked: note.locked
                    })}
                    spellCheck="false"
                    html={note.details}
                    disabled={note.locked}
                    onChange={(e) => noteActions.onUpdate({ ...note, details: e.target.value })}
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
