import CollapseButton from './CollapseButton';
import LockButton from './LockButton';
import UpButton from './UpButton';
import './Toolbar.css';

function Toolbar({ rootNote, parentUrl, noteActions }) {
  return (
    <div className='toolbar'>
      <UpButton parentUrl={parentUrl} />
      <LockButton rootNote={rootNote} noteActions={noteActions} />
      <CollapseButton rootNote={rootNote} noteActions={noteActions} />
    </div>
  );
}

export default Toolbar;
