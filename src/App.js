
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Notes from './components/Notes';
import { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([{
    id:1,
    text: 'Default'
  }]);

  const onDelete = (id) => {
    console.log(id);
    setNotes(notes.filter((note) => note.id !== id ));
  };

  const onAdd = (note) => {
    note.id = Math.floor(Math.random() * 10000);
    setNotes([...notes, note]);
  };

  return (
    <>
      <Sidebar notes={notes} onDelete={onDelete} onAdd={onAdd} />
      <div className="col-2">
        <Header />
        <Notes notes={notes} onDelete={onDelete}/>
      </div>
    </>
  );
} 

export default App;
