import _ from "lodash";
import { Note } from "./use-notes";

/**
   * Visits the note and all sub notes, applying the given function to them.
   * 
   * @param {*} object
   */
export function clone(object: any) {
  return _.cloneDeep(object);
}

/**
   * Visits the note and all sub notes, applying the given function to the note first and then child notes.
   * 
   * @param {*} rootNote 
   * @param {*} apply(note, parent) 
   */
export function visitNoteTree(rootNote: Note, apply: (rootNote: Note, parent?: Note) => void, parent?: Note) {
  apply(rootNote, parent);
  rootNote.children.forEach(c => visitNoteTree(c, apply, rootNote));
}

/**
   * Visits the note and all sub notes, applying the given function to the children first and then parent note.
   * 
   * @param {*} rootNote 
   * @param {*} apply(note, parent) 
   */
export function visitNoteTreeReverse(rootNote: Note, apply: (rootNote: Note, parent?: Note) => void, parent?: Note) {
  rootNote.children.forEach(c => visitNoteTreeReverse(c, apply, rootNote));
  apply(rootNote, parent);
}

/**
 * FindNoteResult
 * 
 */
interface FindNoteResult {
  note: Note;
  parent?: Note;
}

/**
 * Finds a note by id, including nested child notes.
 * 
 * @param {*} notes 
 * @param {*} id 
 * @param {*} parent 
 * @returns note
 */
export function findNote(rootNote: Note, id: string, parent?: Note): FindNoteResult | undefined {

  // if no root was provided, return empty
  if (!rootNote) {
    return;
  }

  // if the root note is a match, return it
  if (rootNote.id === id) {
    return { note: rootNote, parent }
  }

  // recursively search each child
  for (var i = 0; i < rootNote.children.length; i++) {
    var found = findNote(rootNote.children[i], id, rootNote);

    if (found) {
      return found;
    }
  }

}

/**
 * Returns true if a child id is a descendent of the given parent note.
 * 
 * @param {*} parentNote 
 * @param {*} childId 
 * @returns boolean
 */
export function isDescendent(parentNote: Note, childId: string): boolean | undefined {

  // if a child is a direct descendent, return true
  if (parentNote.children.find(n => n.id === childId)) {
    return true;
  }

  // recursively search each child
  for (var i = 0; i < parentNote.children.length; i++) {
    var found = isDescendent(parentNote.children[i], childId);

    if (found) {
      return found;
    }
  }

}

/**
 * Finds the current note from the url paths, or the rootNote if not found.
 * 
 * @param {*} paths 
 * @param {*} rootNote 
 * @returns FindNoteResult
 */
export function findCurrentNote(paths: Array<string>, rootNote: Note): FindNoteResult {

  // if this is a note path, find the matching note from the url
  if (paths[1] === 'note') {
    const result = findNote(rootNote, paths[2]);

    if (result) {
      return result;
    }
  }

  // if not, return the root note
  return {
    note: rootNote
  };
}

interface SearchNote extends Note {
  keep: boolean;
}

/**
 * Returns a filter note tree based on the search term.
 * 
 * @param {*} search 
 * @param {*} note 
 * @returns Note
 */
export function filterNote(search: string | null, note: Note): Note {

  // if no search params, return the note
  if (search === null) {
    return note;
  }

  // decode the search parameter 
  const term = search.toUpperCase();

  // clone the note to prevent saving unwanted state changes
  const clonedNote = clone(note);

  // start at the child nodes to filter non-matches and mark to keep parents to preserve the path
  visitNoteTreeReverse(clonedNote, (currentNote) => {

    // search for a match on the note itself and mark it as keep
    const textFound = currentNote.text != null && currentNote.text.toUpperCase().includes(term);
    const detailsFound = false;// TODO: currentNote.details != null && currentNote.details.toUpperCase().includes(term);

    if (textFound || detailsFound) {
      (currentNote as SearchNote).keep = true;
      currentNote.collapsed = false;
    }

    // filter any children who are not matches or parents of matches
    currentNote.children = currentNote.children.filter((c) => {

      // keep notes marked by child matches
      if ((c as SearchNote).keep) {
        (currentNote as SearchNote).keep = true;
        currentNote.collapsed = false;
        return true;
      }

      // search for text matches
      const textFound = c.text != null && c.text.toUpperCase().includes(term);
      const detailsFound = false;// TODO: c.details != null && c.details.toUpperCase().includes(term);

      // keep matches and mark parent to be kept
      if (textFound || detailsFound) {
        (currentNote as SearchNote).keep = true;
        currentNote.collapsed = false;
        return true;
      }

      return false;
    });

  });

  return clonedNote;
}

/**
   * Returns the parent url for the up button navigation.
   * 
   * @returns url
   */
export function findParentUrl(parentNote: Note | undefined, paths: Array<string>, search: string | null): string | null {

  // if this is a note path, return the parent
  if (parentNote && paths[1] === 'note') {
    return parentNote.root ? '/' : `/note/${parentNote.id}`;
  }

  // if this is a root search, return the root to clear search params
  if (search != null) {
    return '/';
  }

  // otherwise return null
  return null;
}