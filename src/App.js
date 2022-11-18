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
    note.level = 1;
    note.children = [];
    const newNotes = [...notes, note];
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  const onAddSubNote = (note) => {
    const id = uuidv4(); 
    const subNote = {id, children: [], level: note.level + 1, text: 'Sub Note'};
    note.children.push(subNote);
    const newNotes = notes.map((n) => n.id !== note.id ? n : note );
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  // TODO: Duplicate has to also update the parent note and add itself to parent.children

  const onDuplicate = (note) => {
    const id = uuidv4(); 
    const newNote = {...note, id};
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  // TODO: These methods don't properly handle sub note searching yet

  const onUpdate = (note) => {
    const newNotes = notes.map((n) => n.id !== note.id ? n : note );
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  const onDelete = (id) => {
    const newNotes = notes.filter((note) => note.id !== id );
    setNotes(newNotes);
    onWrite(JSON.stringify(newNotes));
  };

  async function onWrite(contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  return (
    <>
      <Sidebar fileHandle={fileHandle} notes={notes} onAdd={onAdd} onLoad={onLoad} />
      <div className="col-2">
        <Header fileHandle={fileHandle} />
        <Notes notes={notes} onAdd={onAdd} onAddSubNote={onAddSubNote} onDuplicate={onDuplicate} onUpdate={onUpdate} onDelete={onDelete}/>
      </div>
    </>
  );
} 

export default App;
