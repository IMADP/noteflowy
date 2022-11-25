import { PlusIcon } from '@radix-ui/react-icons';
import { useLocation, useSearchParams } from 'react-router-dom';
import { clone, findNote, visitNoteTreeReverse } from '../appUtil';
import Header from "../content-header/Header";
import Toolbar from '../content-toolbar/Toolbar';
import Note from '../content-note/Note';
import './Content.css';

/**
 * Content
 * 
 * This component is primarily responsible for providing the notes array to child components.
 * It will inspect the url to determine the parent note, and filter based on search parameters.
 * 
 * @param {*} param0 
 * @returns 
 */
function Content({ notes, noteActions }) {
  const paths = useLocation().pathname.split('/');
  const isNotePath = paths[1] === 'note';
  let parent = null;

  // if this is not the root path, find the matching note from the url
  if (isNotePath) {
    const result = findNote(notes, paths[2]);
    parent = result.parent;

    if (result.note) {
      notes = [result.note];
    }
  }

  // if search params were provided, clone and filter out matching notes
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  // filter notes by search
  if (search != null) {
    const term = decodeURI(search).toUpperCase();
    const clonedNotes = clone(notes);

    // start at the child nodes to filter non-matches and mark to keep parents to preserve the path
    visitNoteTreeReverse(clonedNotes, (currentNote) => {

      // search for a match on the note itself and mark it as keep
      const textFound = currentNote.text != null && currentNote.text.toUpperCase().includes(term);
      const detailsFound = currentNote.details != null && currentNote.details.toUpperCase().includes(term);

      if (textFound || detailsFound) {
        currentNote.keep = true;
        currentNote.collapsed = false;
      }

      // filter any children who are not matches or parents of matches
      currentNote.children = currentNote.children.filter((c) => {

        // keep notes marked by child matches
        if (c.keep) {
          currentNote.keep = true;
          currentNote.collapsed = false;
          return true;
        }

        // search for text matches
        const textFound = c.text != null && c.text.toUpperCase().includes(term);
        const detailsFound = c.details != null && c.details.toUpperCase().includes(term);

        // keep matches and mark parent to be kept
        if (textFound || detailsFound) {
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

  /**
   * Returns the parent url for the up button navigation.
   * 
   * @returns url
   */
  const findParentUrl = () => {

    // if its a note path, return the parent
    if (isNotePath) {
      return parent === undefined ? '/' : `/note/${parent.id}`;
    }

    // if its a root search, return the root
    if (search != null) {
      return '/';
    }

    // otherwise return null
    return null;
  }

  // if search term, remove search param
  const parentUrl = findParentUrl();

  return (
    <>
      <Header />
      <main className="Notes content">
        <article>
          <ul className='NotesList'>

            <li>
              <Toolbar notes={notes} parentUrl={parentUrl} noteActions={noteActions} />
            </li>

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
    </>
  );
}

export default Content;