import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Notes from './components/notes/Notes';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [fileHandle, setFileHandle] = useState(null);
  const [notes, setNotes] = useState([]);

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

  const onAdd = (note) => {
    note.id = uuidv4();
    note.children = [];
    const newNotes = [...notes, note];
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  const onAddSubNote = (note) => {
    const id = uuidv4();
    const subNote = { id, children: [], text: 'Sub Note' };
    note.children.push(subNote);
    const newNotes = notes.map((n) => n.id !== note.id ? n : note);
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  const onDuplicate = (parent, note) => {
    const id = uuidv4();
    const newNote = { ...note, id };
    visit(note, (child, parent) => {
      child.id = uuidv4();
    })
    
    // need to find a more consistent way to mutate state
    if(parent !== undefined) {
      parent.children.push(newNote);
      const newNotes = notes.map(n => n);
      setNotes(newNotes);
      onWrite(JSON.stringify(newNotes));
    } else {
      const newNotes = [...notes, newNote]
      setNotes(newNotes);
      onWrite(JSON.stringify(newNotes));
    }
    
  };

  const onUpdate = (note) => {
    const oldNote = findNote(notes, note.id);
    oldNote.text = note.text;
    oldNote.details = note.details;
    
    // is this the right way to do this? clone the list just to update state of an internal note?
    const newNotes = notes.map(n => n);
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  const onDelete = (id) => {

    // filter out parent note
    const newNotes = notes.filter(n => n.id !== id);

    // filter out child note
    newNotes.forEach(n => {
      visit(n, (child, parent) => {
         if(parent !== null && child.id === id) {
          parent.children = parent.children.filter(childNote => childNote.id !== id);
        }
      });
    });

    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  const noteActions = {
    onAdd,
    onAddSubNote,
    onDuplicate,
    onUpdate,
    onDelete
  };

  async function onWrite(contents) {
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
  }

  function visit(note, apply) {
    apply(note, null);
    note.children.forEach(c => apply(c, note));
    note.children.forEach(c => visit(c, apply));
  }

  function findNote(notes, id) {
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

  return (
    <>
      <Sidebar fileHandle={fileHandle} notes={notes} onAdd={noteActions.onAdd} onLoad={onLoad} />
      <div className="col-2">
        <Header fileHandle={fileHandle} />
        <Notes notes={notes} noteActions={noteActions} />
      </div>
    </>
  );
}

export default App;
