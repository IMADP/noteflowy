import CollapseButton from './CollapseButton';
import LockButton from './LockButton';
import UpButton from './UpButton';
import './Toolbar.css';

function Toolbar({ notes, parentUrl, noteActions }) {
  return (
    <div className='toolbar'>
      <UpButton parentUrl={parentUrl} />
      <LockButton notes={notes} noteActions={noteActions} />
      <CollapseButton notes={notes} noteActions={noteActions} />
    </div>
  );
}

export default Toolbar;
