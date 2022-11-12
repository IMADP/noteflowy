
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Notes from './components/Notes';
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
      var data = JSON.parse(contents);
      setFileHandle(fileHandle);
      setNotes(data);
    }
    onLoadAsync();
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

  const onAdd = (note) => {
    note.id = uuidv4(); 
    setNotes([...notes, note]);
    onWrite(JSON.stringify(notes));
  };

  return (
    <>
      <Sidebar fileHandle={fileHandle} notes={notes} onAdd={onAdd}  onLoad={onLoad} />
      <div className="col-2">
        <Header />
        <Notes notes={notes} onDelete={onDelete}/>
      </div>
    </>
  );
} 

export default App;
