import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  // this effect will reset the search bar when navigating away
  useEffect(() => {
    const paths = location.pathname.split('/');
    const isSearchPath = paths[1] === 'search';

    if(!isSearchPath) {
      setQuery('');
    }
    
  }, [location]);

  /**
   * Sets the query from the input and navigates to a search url.
   * 
   * @param {*} q 
   */
  const onChange = (q) => {
    setQuery(q);
    navigate(`/search/${q}`);
  };

  return (
    <header>
      <input type='text' style={{ width: '100%', height: '100%' }}
        placeholder="Search..."
        value = {query}
        onChange={(e) => onChange(e.target.value)} />
    </header>
  );
}

export default Header;