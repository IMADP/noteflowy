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
