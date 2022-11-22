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
   * Visits the note and all sub notes, applying the given function to them.
   * 
   * @param {*} note 
   * @param {*} apply(note, parent) 
   */
 export function visitNote(note, apply, parent) {
  apply(note, parent);
  note.children.forEach(c => visitNote(c, apply, note));
}

/**
   * Visits a list of notes and all sub notes, applying the given function to them.
   * 
   * @param {*} notes 
   * @param {*} apply(note, parent) 
   */
export function visitNotes(notes, apply) {
  notes.forEach(note => {visitNote(note, apply)});
}

/**
 * Finds a note by id, including nested child notes.
 * 
 * @param {*} notes 
 * @param {*} id 
 * @param {*} parent 
 * @returns note
 */
export function findNote(notes, id, parent) {
  if (notes) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        return { note: notes[i], parent }
      }
      var found = findNote(notes[i].children, id, notes[i]);

      if (found) {
        return found;
      }
    }
  }
}
