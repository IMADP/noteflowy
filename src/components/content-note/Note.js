import { FrameIcon, MoveIcon, PaddingIcon, TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from "react-router-dom";
import { findNote, isDescendent } from '../appUtil';
import Menu from './Menu';
import './Note.css';
import NoteDetails from './NoteDetails';
import NoteText from './NoteText';

function Note({ rootNote, note, parent, noteActions }) {

    // get the drag and preview refs
    const [, drag, dragPreview] = useDrag(() => ({
        type: 'note',
        item: { id: note.id }
    }));

    // determines if a dragged note can be nested under the current note
    const canDropFunction = (draggedNote) => {

        // don't allow dragging to itself
        if(draggedNote.id === note.id) {
            return false;
        }

        const { note: itemNote }  = findNote(rootNote, draggedNote.id);

        // don't allow dragging to direct parent
        if(note.children.find(n => n.id === draggedNote.id)) {
            return false;
        }

        // don't allow a parent note to be dragged into a descendent
        return !isDescendent(itemNote, note.id);
    }

    const [{ canDrop }, drop] = useDrop(
        () => ({
            accept: 'note',
            drop: (droppedNote) => noteActions.onMove(droppedNote.id, note.id),
            canDrop: canDropFunction,
            collect: (monitor) => ({
                canDrop: !!monitor.canDrop()
            })
        }), [note]
    );

    return (
        <div className="Note" >

            <div >

                <Menu
                    note={note}
                    parent={parent}
                    noteActions={noteActions}
                />

                <span type="button" style={{ cursor: 'move' }} ref={(node) => drag(drop(node))} >
                    {!canDrop && <MoveIcon />}
                    {canDrop && <PaddingIcon style={{color: 'green'}} />}
                </span>

                <Link to={`/note/${note.id}`}>
                    <button type="button" >
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

                <span ref={dragPreview}>
                    <NoteText note={note} parent={parent} noteActions={noteActions} />
                </span>

                <NoteDetails note={note} noteActions={noteActions} />
            </div>

            {!note.collapsed && <ul className='NotesList'>
                {note.children.map((n) => (
                    <li key={n.id}>
                        <Note rootNote={rootNote} note={n} parent={note} noteActions={noteActions} />
                    </li>
                ))}
            </ul>
            }

        </div>
    );
}

export default Note;
