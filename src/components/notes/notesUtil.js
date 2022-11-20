/**
   * Visits all notes and sub notes, applying the given function to them.
   * 
   * @param {*} note 
   * @param {*} apply(note, parent) 
   */
 export function visitNotes(note, apply) {
    apply(note, null);
    note.children.forEach(c => apply(c, note));
    note.children.forEach(c => visitNotes(c, apply));
  }

  /**
   * Finds a note by id, including nested child notes.
   * 
   * @param {*} notes 
   * @param {*} id 
   * @returns note
   */
  export function findNote(notes, id) {
    if (notes) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          return notes[i];
        }
        var found = findNote(notes[i].children, id);

        if (found) {
          return found;
        }
      }
    }
  }

  