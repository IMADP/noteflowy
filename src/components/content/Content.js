import Header from "../content-header/Header";
import Notes from "../content-notes/Notes";

function Content({ notes, noteActions }) {
  return (
    <>
      <Header />
      <Notes notes={notes} noteActions={noteActions} />
    </>
  );
}

export default Content;