import { Link  } from "react-router-dom";

function SidebarNote({note}) {
    return (
        <>
            <Link to={note.id}>{note.text}</Link>
        </>
    );
  } 
  
  export default SidebarNote;
  