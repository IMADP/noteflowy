import { PlusIcon } from '@radix-ui/react-icons';

function NotesAdd({ noteActions }) {
  return (
    <button onClick={noteActions.onAdd}>
      <PlusIcon />
    </button>
  );
}

export default NotesAdd;
