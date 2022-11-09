
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Notes from './components/Notes';

function App() {
  return (
    <>
      <Sidebar />
      <div className="col-2">
        <Header />
        <Notes />
      </div>
    </>
  );
} 

export default App;
