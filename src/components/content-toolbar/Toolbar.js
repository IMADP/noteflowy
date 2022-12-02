import CollapseButton from './CollapseButton';
import LockButton from './LockButton';
import UpButton from './UpButton';
import DropButton from './DropButton';
import './Toolbar.css';

function Toolbar({ note, parentUrl, noteActions }) {
  return (
    <div className='toolbar'>
      <DropButton note={note} noteActions={noteActions} />
      <UpButton parentUrl={parentUrl} />
      <LockButton note={note} noteActions={noteActions} />
      <CollapseButton note={note} noteActions={noteActions} />
    </div>
  );
}

export default Toolbar;
