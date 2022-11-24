import ContentHeader from "../content-header/ContentHeader";
import ContentNotes from "../content-notes/ContentNotes";

function Content({ notes, noteActions }) {
  return (
    <>
      <ContentHeader />
      <ContentNotes notes={notes} noteActions={noteActions} />
    </>
  );
}

export default Content;