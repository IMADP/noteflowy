import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ContentHeader() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  // this effect will reset the search bar when navigating away
  useEffect(() => {
    if(searchParams.get('search') == null) {
      setQuery('');
    }
    
  }, [location, searchParams]);

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

export default ContentHeader;