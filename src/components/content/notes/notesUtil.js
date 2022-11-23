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
   * @param {*} noteOrNotes 
   * @param {*} apply(note, parent) 
   */
 export function visitNoteTree(noteOrNotes, apply, parent) {
  const notes = Array.isArray(noteOrNotes) ? noteOrNotes : [noteOrNotes];

  notes.forEach(note => {
    apply(note, parent);
    note.children.forEach(c => visitNoteTree(c, apply, note));
  });
}

/**
   * Visits the note and all sub notes, applying the given function to the children first and then parent note.
   * 
   * @param {*} noteOrNotes 
   * @param {*} apply(note, parent) 
   */
 export function visitNoteTreeReverse(noteOrNotes, apply, parent) {
  const notes = Array.isArray(noteOrNotes) ? noteOrNotes : [noteOrNotes];

  notes.forEach(note => {
    note.children.forEach(c => visitNoteTreeReverse(c, apply, note));
    apply(note, parent);
  });
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
