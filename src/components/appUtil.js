import _ from "lodash";

/**
   * Visits the note and all sub notes, applying the given function to them.
   * 
   * @param {*} object
   */
export function clone(object) {
  return _.cloneDeep(object);
}

/**
   * Visits the note and all sub notes, applying the given function to the note first and then child notes.
   * 
   * @param {*} rootNote 
   * @param {*} apply(note, parent) 
   */
export function visitNoteTree(rootNote, apply, parent) {
  apply(rootNote, parent);
  rootNote.children.forEach(c => visitNoteTree(c, apply, rootNote));
}

/**
   * Visits the note and all sub notes, applying the given function to the children first and then parent note.
   * 
   * @param {*} rootNote 
   * @param {*} apply(note, parent) 
   */
export function visitNoteTreeReverse(rootNote, apply, parent) {
  rootNote.children.forEach(c => visitNoteTreeReverse(c, apply, rootNote));
  apply(rootNote, parent);
}

/**
 * Finds a note by id, including nested child notes.
 * 
 * @param {*} notes 
 * @param {*} id 
 * @param {*} parent 
 * @returns note
 */
export function findNote(rootNote, id, parent) {

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
