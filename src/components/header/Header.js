
import { Link } from "react-router-dom";

function Header({ fileHandle }) {
  const headerText = fileHandle !== null ? fileHandle.name : 'No file loaded';

  return (
    <header>
      <Link to='/'>{headerText}</Link> 
    </header>
  );
} 

export default Header;
