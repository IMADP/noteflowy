/**
   * Visits the note and all sub notes, applying the given function to them.
   * 
   * @param {*} note 
   * @param {*} apply(note, parent) 
   */
 export function visitNote(note, apply) {
  apply(note, null);
  note.children.forEach(c => apply(c, note));
  note.children.forEach(c => visitNote(c, apply));
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
