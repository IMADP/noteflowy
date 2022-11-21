import Note from './Note';
import './Notes.css';
import { useLocation } from 'react-router-dom'
import { findNote } from './notesUtil';
import { DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { Link } from "react-router-dom";
import NotesCollapse from './NotesCollapse';
import NotesAdd from './NotesAdd';

function Notes({ notes, noteActions }) {
  const paths = useLocation().pathname.split('/');

  if (notes.length === 0) {
    // TODO: Should have an instructions page
    return <></>;
  }



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
    const term = decodeURI(paths[2]);
    console.log('Filter by ' + term);
  }

  return (
    <main className="Notes content">
      <article>
        <ul className='NotesList'>

          <li>
            {(isRootPath || isSearchPath) &&
              <button >
                <DoubleArrowUpIcon color='lightGray' />
              </button>
            }

            {isNotePath &&
              <Link to={parent === undefined ? '/' : `/note/${parent.id}`}>
                <button>
                  <DoubleArrowUpIcon />
                </button>
              </Link>
            }

            <NotesCollapse notes={notes} noteActions={noteActions} />

          </li>

          {notes.map((note) => (
            <li key={note.id}>
              <Note note={note} noteActions={noteActions} />
            </li>
          ))}

          <li>
            <NotesAdd noteActions={noteActions} />
          </li>

        </ul>
      </article>
    </main>
  );
}

export default Notes;
