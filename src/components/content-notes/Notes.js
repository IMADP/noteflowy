import { DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Note from './Note';
import './Notes.css';
import NotesAdd from './NotesAdd';
import NotesCollapse from './NotesCollapse';
import { clone, findNote,  visitNoteTreeReverse } from '../appUtil';

function Notes({ notes, noteActions }) {
  const [searchParams] = useSearchParams();
 
  const paths = useLocation().pathname.split('/');
  const isRootPath = paths.length === 2;
  const isNotePath = paths[1] === 'note';
  const search = searchParams.get('search');

  let parent;

  // TODO: This component needs to be broken up into several smaller ones

  // filter note by path
  if (isNotePath) {
    const result = findNote(notes, paths[2]);
    parent = result.parent;

    if (result.note) {
      notes = [result.note];
    }
  }

  // filter notes by search
  if (search != null) {
    const term = decodeURI(search).toUpperCase();
    const clonedNotes = clone(notes);

    // start at the child nodes to filter non-matches and mark to keep parents to preserve the path
    visitNoteTreeReverse(clonedNotes, (currentNote) => {

      // search for a match on the note itself and mark it as keep
      const textFound = currentNote.text != null && currentNote.text.toUpperCase().includes(term);
      const detailsFound = currentNote.details != null && currentNote.details.toUpperCase().includes(term);
      
      if(textFound || detailsFound) {
        currentNote.keep = true;
        currentNote.collapsed = false;
      }

      // filter any children who are not matches or parents of matches
      currentNote.children = currentNote.children.filter((c) => {

        // keep notes marked by child matches
        if(c.keep) {
          currentNote.keep = true;
          currentNote.collapsed = false;
          return true;
        }

        // search for text matches
        const textFound = c.text != null && c.text.toUpperCase().includes(term);
        const detailsFound = c.details != null && c.details.toUpperCase().includes(term);
      
        // keep matches and mark parent to be kept
        if(textFound || detailsFound) {
          currentNote.keep = true;
          currentNote.collapsed = false;
          return true;
        }

        return false;
      });

    });

    // finally trim out any parent nodes that weren't marked to keep
    notes = clonedNotes.filter((n) => n.keep);
  }

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
