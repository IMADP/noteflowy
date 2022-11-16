
function Header({ fileHandle, onLoad }) {
  const headerText = fileHandle !== null ? fileHandle.name : 'No file loaded';

  return (
    <header>
      {headerText}
    </header>
  );
} 

export default Header;
