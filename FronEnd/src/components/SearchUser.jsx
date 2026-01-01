import { useState, useEffect } from "react";
import axios from "axios";

 function SearchUser({  searchQuery,
                  setSearchQuery,
                  setSearchResults,
                  setShowResults}) {

useEffect(() => {
  if (!searchQuery.trim()) {
    setSearchResults([]);
    setShowResults(false);
    return;
  }

  const delayDebounce = setTimeout(async () => {
    const res = await axios.get(
      `http://localhost:3000/user/search?q=${searchQuery}`,
      { withCredentials: true }
    );

    setSearchResults(res.data);
    setShowResults(true);
  }, 400);

  return () => clearTimeout(delayDebounce);
}, [searchQuery]);

  
  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search user..." className="py-2 px-4 text-white rounded-xl focus:bg-indigo-700    focus:outline-0 bg-indigo-600 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

    </div>
  );
}
export default SearchUser