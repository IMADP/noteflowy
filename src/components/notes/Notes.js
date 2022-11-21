import Note from './Note';
import './Notes.css';
import { useLocation } from 'react-router-dom'
import { findNote } from './notesUtil';
import { DoubleArrowUpIcon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from "react-router-dom";

function Notes({ notes, noteActions }) {
  const paths = useLocation().pathname.split('/');
  const isRootPath = paths.length === 2;
  const isNotePath = paths[1] === 'note';
  const isSearchPath = paths[1] === 'search';

  let parent;

  // filter note by path
  if (isNotePath) {
    const result = findNote(notes, paths[2]);
    parent = result.parent;

    if (result.note) {
      notes = [result.note];
    }
  }

  // filter notes by search
  if (isSearchPath) {
    // TODO
    console.log('Filter by ' + paths[2]);
  }

  return (
    <main className="Notes content">
      <article>
        <ul className='NotesList'>

          {isRootPath && <li>
            <button >
                <DoubleArrowUpIcon color='lightGray' />
              </button>
          </li>}

          {isNotePath &&
            <Link to={parent === undefined ? '/' : `/note/${parent.id}`}>
              <li>
                <button>
                  <DoubleArrowUpIcon />
                </button>
              </li>
            </Link>
          }

          {notes.map((note) => (
            <li key={note.id}>
              <Note note={note} noteActions={noteActions} />
            </li>
          ))}

          <li>
            <button onClick={noteActions.onAdd}>
              <PlusIcon />
            </button>
          </li>

        </ul>
      </article>
    </main>
  );
}

export default Notes;
