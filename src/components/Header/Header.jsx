import { useState } from "react";
import SearchIcon from "../../assets/search-icon.svg";
import "./HeaderStyles.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

// Header component
const Header = ({ handleSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className={`header ${isSearchOpen && "search-open"}`}>
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">
            <Link to={"/"}>University Explorer</Link>
          </span>
        </div>
        <nav className="nav">
          <img
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            src={SearchIcon}
            alt="Search Icon"
          />
        </nav>
      </div>
      {isSearchOpen && (
        <>
          <div className="divider"></div>
          <SearchBar onSearch={handleSearch} />
        </>
      )}
    </header>
  );
};

export default Header;
