import { DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import Note from './Note';
import './Notes.css';
import NotesAdd from './NotesAdd';
import NotesCollapse from './NotesCollapse';

function Notes({ notes, parent, noteActions }) {
  const paths = useLocation().pathname.split('/');
  const isRootPath = paths.length === 2;

  return (
    <main className="Notes content">
      <article>
        <ul className='NotesList'>

          <li>
            {(isRootPath) &&
              <button >
                <DoubleArrowUpIcon color='lightGray' />
              </button>
            }

            {!isRootPath &&
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
