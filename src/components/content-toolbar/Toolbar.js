import CollapseButton from './CollapseButton';
import UpButton from './UpButton';

function Toolbar({ notes, parentUrl, noteActions }) {
  return (
    <>
      <UpButton parentUrl={parentUrl} />
      <CollapseButton notes={notes} noteActions={noteActions} />
    </>
  );
}

export default Toolbar;
