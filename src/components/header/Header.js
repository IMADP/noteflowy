import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // TODO: Clear input state on url change away from /search
  
  return (
    <header>
      <input type='text' style={{width: '100%', height: '100%'}} 
        placeholder="Search..."
        onChange={(e) => navigate(`/search/${e.target.value}`)} />
    </header>
  );
} 

export default Header;
