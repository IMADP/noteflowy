import CollapseButton from './CollapseButton';
import LockButton from './LockButton';
import UpButton from './UpButton';
import './Toolbar.css';

function Toolbar({ note, parentUrl, noteActions }) {
  return (
    <div className='toolbar'>
      <UpButton parentUrl={parentUrl} />
      <LockButton note={note} noteActions={noteActions} />
      <CollapseButton note={note} noteActions={noteActions} />
    </div>
  );
}

export default Toolbar;
