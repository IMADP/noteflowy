import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useImmer } from "use-immer";

function Header() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [query, setQuery] = useImmer(search === null ? '' : search);

  // this effect will reset the search bar when navigating away
  useEffect(() => {
    if(searchParams.get('search') == null) {
      setQuery('');
    }
  }, [location, searchParams, setQuery]);

  /**
   * Sets the query from the input and navigates to a search url.
   * 
   * @param {*} q 
   */
  const onChange = (q) => {
    setQuery(q);
    setSearchParams({search: q});
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