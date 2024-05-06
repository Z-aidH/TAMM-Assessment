import React, { useState } from "react";
import "./SearchBarStyles.css";
import { useLocation, useNavigate } from "react-router-dom";

// search bar component
function SearchBar({ onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSearch = () => {
    if (location.pathname.includes("/details")) {
      navigate("/");
    }
    onSearch(searchTerm);
  };
  return (
    <div className="search-bar-container">
      <input
      //autofocus so onclick immediately allows the user to type
        autoFocus
        onBlur={handleOnSearch}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOnSearch();
          }
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search universities by name"
      />
    </div>
  );
}

export default SearchBar;
