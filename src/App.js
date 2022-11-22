import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Notes from './components/notes/Notes';
import NotesInstructions from './components/notes/NotesInstructions';
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect } from 'react';
import { clone, findNote, visitNote, visitNotes } from './components/notes/notesUtil'; 

function App() {
  const [fileHandle, setFileHandle] = useImmer(null);
  const [notes, setNotes] = useImmer([]);

  /**
   * This effect will save the notes state to a file on change.
   * 
   */
  useEffect(() => {

    // do nothing if there is no file loaded
    if (fileHandle == null) {
      return;
    }
    
    // create an async function to write to a file
    const writeData = async () => {
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(notes));
      await writable.close();
    }

    writeData();
  }, [fileHandle, notes]);

  /**
   * Loads a file and parses the notes data.
   * 
   */
  const onLoad = () => {
    const onLoadAsync = async () => {
      let [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const contents = await file.text();
      var data = Object.keys(contents).length > 0 ? JSON.parse(contents) : [];
      setFileHandle(fileHandle);
      setNotes(data);
    }
    onLoadAsync();
  };

  /**
   * Adds a new note to the note list.
   * 
   * @param {*} note 
   */
  const onAdd = () => {
    setNotes((draftNotes) => {
      draftNotes.push({
        id: uuidv4(),
        children: [],
        text: 'New Note',
        collapsed: false,
        details: null
      });
    })
  };

  /**
   * Adds a sub note to a parent note.
   * 
   * @param {*} parent 
   */
  const onAddSubNote = (parent) => {
    setNotes((draftNotes) => {
      const note = findNote(draftNotes, parent.id).note;

      note.children.push({
        id: uuidv4(),
        children: [],
        text: 'New Sub Note',
        collapsed: false,
        details: ''
      });
    })
  };

  /**
   * Updates the note contents.
   * 
   * @param {*} note 
   */
  const onUpdate = (note) => {
    setNotes((draftNotes) => {
      const draftNote = findNote(draftNotes, note.id).note;
      draftNote.text = note.text;
      draftNote.details = note.details;
      draftNote.collapsed = note.collapsed;
      draftNote.completed = note.completed;
    })
  };

  /**
   * Updates all notes and sub notes.
   * 
   * @param {*} notes 
   * @param {*} collapsed 
   */
   const onUpdateAll = (notes, updateAction) => {
    setNotes((draftNotes) => {
      notes.forEach((note) => {
        const draftNote = findNote(draftNotes, note.id).note

        visitNote(draftNote, (n) => {
          updateAction(n);
        })
      })
    })
  }

  /**
   * Duplicates a note and all sub notes.
   * 
   * @param {*} parent 
   * @param {*} note 
   */
  const onDuplicate = (parent, note) => {

    // deep clone the note and all sub notes
    const duplicateNote = clone(note);

    // update note and sub notes with new ids
    visitNote(duplicateNote, (child) => {
      child.id = uuidv4();
    })

    setNotes((draftNotes) => {

      // if the note has no parent, add it to the root notes list
      if (parent === undefined) {
        draftNotes.push(duplicateNote);
        return;
      }

      // otherwise find the parent and add to the list of children
      const parentNote = findNote(draftNotes, parent.id).note;
      parentNote.children.push(duplicateNote);
    })
  };

  /**
   * Deletes a note by id.
   * 
   * @param {*} id 
   */
  const onDelete = (id) => {
    setNotes((draftNotes) => {
      const index = draftNotes.findIndex(note => note.id === id);

      // if we found a parent note, remove it from the notes list
      if (index !== -1) {
        draftNotes.splice(index, 1)
        return;
      }

      // otherwise look for a child note and remove it from its parent
      visitNotes(draftNotes, (child, parent) => {
        if (child.id === id) {
          parent.children = parent.children.filter(childNote => childNote.id !== id);
        }
      });

    })
  };

  const noteActions = {
    onAdd,
    onAddSubNote,
    onDuplicate,
    onUpdate,
    onUpdateAll,
    onDelete
  };

  return (
    <Router>
      <Sidebar fileHandle={fileHandle} notes={notes} onLoad={onLoad} />
      <div className="col-2">
        <Header/>
        {notes.length === 0 && <NotesInstructions />}
        {notes.length > 0 && <Notes notes={notes} noteActions={noteActions} />}
      </div>
    </Router>
  );
}

export default App;
