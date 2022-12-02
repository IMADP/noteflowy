import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { clone, findNote, visitNoteTree } from './appUtil';
import Navigation from './navigation/Navigation';
import instructionNotes from '../instructions';
import Content from './content/Content';

function App() {
  const [fileHandle, setFileHandle] = useImmer(null);
  const [rootNote, setRootNote] = useImmer(instructionNotes);

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
      await writable.write(JSON.stringify(rootNote));
      await writable.close();
    }

    writeData();
  }, [fileHandle, rootNote]);

  /**
   * Loads a file and parses the notes data.
   * 
   */
  const onLoad = () => {
    const onLoadAsync = async () => {
      let [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const contents = await file.text();
      var data = Object.keys(contents).length > 0 ? JSON.parse(contents) : { root: true, children: [] };
      setFileHandle(fileHandle);
      setRootNote(data);
    }
    onLoadAsync();
  };

  /**
   * Adds a new note to the note list.
   * 
   * @param {*} note 
   */
  const onAdd = (parent) => {
    setRootNote((draftRootNote) => {
      const note = {
        id: uuidv4(),
        children: [],
        text: 'New Note',
        details: 'Details',
        collapsed: false,
        locked: false,
        showDetails: false
      };

      const draftNote = findNote(draftRootNote, parent.id).note;
      draftNote.children.push(note);
    })
  };

  /**
   * Adds a sub note to a parent note.
   * 
   * @param {*} parent 
   */
  const onAddSubNote = (parent) => {
    setRootNote((draftRootNote) => {
      const note = findNote(draftRootNote, parent.id).note;

      note.children.push({
        id: uuidv4(),
        children: [],
        text: 'New Sub Note',
        collapsed: false,
        locked: false,
        showDetails: false,
        link: null,
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
    setRootNote((draftRootNote) => {
      const draftNote = findNote(draftRootNote, note.id).note;
      draftNote.text = note.text;
      draftNote.details = note.details;
      draftNote.collapsed = note.collapsed;
      draftNote.completed = note.completed;
      draftNote.locked = note.locked;
      draftNote.showDetails = note.showDetails;
      draftNote.link = note.link;
    })
  };

  /**
   * Updates all notes and sub notes.
   * 
   * @param {*} notes 
   * @param {*} collapsed 
   */
  const onUpdateAll = (note, updateAction) => {
    setRootNote((draftRootNote) => {
      const draftNote = findNote(draftRootNote, note.id).note

      visitNoteTree(draftNote, (n) => {
        updateAction(n);
      })
    })
  }

  /**
   * Moves a note from one parent to another.
   * 
   * @param {*} sourceId 
   * @param {*} parentId 
   */
   const onMove = (sourceId, parentId) => {
    setRootNote((draftRootNote) => {

      // do nothing if source and destination are the same
      if(sourceId === parentId) {
        return;
      }

      // find the source note and target note
      const {note: sourceNote, parent: sourceParent} = findNote(draftRootNote, sourceId);
      const {note: targetNote} = findNote(draftRootNote, parentId);

      // remove from original parent and add to new parent
      sourceParent.children = sourceParent.children.filter(n => n.id !== sourceId);
      targetNote.children.push(sourceNote);
    })
  };

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
    visitNoteTree(duplicateNote, (child) => {
      child.id = uuidv4();
    })

    setRootNote((draftRootNote) => {
      // find the parent and add to the list of children
      const parentNote = findNote(draftRootNote, parent.id).note;
      parentNote.children.push(duplicateNote);
    })
  };

  /**
   * Deletes a note by id.
   * 
   * @param {*} id 
   */
  const onDelete = (id) => {
    setRootNote((draftRootNote) => {
      // look for a child note and remove it from its parent
      visitNoteTree(draftRootNote, (child, parent) => {
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
    onMove,
    onDelete
  };

  return (
      <Router>
        <Navigation fileHandle={fileHandle} rootNote={rootNote} onLoad={onLoad} />
        <div className="col-2">
          <Content rootNote={rootNote} noteActions={noteActions} />
        </div>
      </Router>
  );
}

export default App;
