import ContentHeader from "./ContentHeader";
import ContentNotes from "./ContentNotes";

function Content({ notes, noteActions }) {
  return (
    <>
      <ContentHeader />
      <ContentNotes notes={notes} noteActions={noteActions} />
    </>
  );
}

export default Content;