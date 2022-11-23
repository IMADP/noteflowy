import { Link } from "react-router-dom";

function NavigationLink({ note }) {
    return (
        <Link to={`/note/${note.id}`}>{note.text}</Link>
    );
}

export default NavigationLink;
