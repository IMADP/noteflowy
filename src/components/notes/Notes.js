import { DoubleArrowUpIcon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import Note from './Note';
import './Notes.css';
import NotesAdd from './NotesAdd';
import NotesCollapse from './NotesCollapse';
import { clone, findNote, visitNote, visitNotes } from './notesUtil';

function Notes({ notes, noteActions }) {
  const paths = useLocation().pathname.split('/');
  const isRootPath = paths.length === 2;
  const isNotePath = paths[1] === 'note';
  const isSearchPath = paths[1] === 'search';

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
  if (isSearchPath) {
    const term = decodeURI(paths[2]).toUpperCase();
    const foundNotes = [];
    const clonedNotes = clone(notes);

    // in the first step, find any root nodes that need to be added via match or a child match
    clonedNotes.forEach(note => {

      const textFound = note.text != null && note.text.toUpperCase().includes(term);
      const detailsFound = note.details != null && note.details.toUpperCase().includes(term);
      let childFound = false;

      note.children.forEach(child => {
        visitNote(child, (currentChildNote) => {
          const textFound = currentChildNote.text != null && currentChildNote.text.toUpperCase().includes(term);
          const detailsFound = currentChildNote.details != null && currentChildNote.details.toUpperCase().includes(term);
         
          if(textFound || detailsFound) {
            childFound = true;
          }
    
        });
      });

      if (childFound || textFound || detailsFound) {
        foundNotes.push(note);
      }

    });

    // in the second part, we prune out any note who doesn't match and children doesn't match
    visitNotes(clonedNotes, (note, parent) => {

      if(parent === undefined) {
        return;
      }

      const textFound = note.text != null && note.text.toUpperCase().includes(term);
      const detailsFound = note.details != null && note.details.toUpperCase().includes(term);
      let childFound = false;

      note.children.forEach(child => {
        visitNote(child, (currentChildNote) => {
          const textFound = currentChildNote.text != null && currentChildNote.text.toUpperCase().includes(term);
          const detailsFound = currentChildNote.details != null && currentChildNote.details.toUpperCase().includes(term);
         
          if(textFound || detailsFound) {
            childFound = true;
          }
    
        });
      });

      if (!childFound && !textFound && !detailsFound) {
        parent.children = parent.children.filter((c) => c.id !== note.id);
      }

    });

    notes = foundNotes;
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
