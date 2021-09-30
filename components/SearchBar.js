import React from "react";
import styles from "../styles/SearchBarStyles.module.scss";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      className={styles.searchBar}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="text"
      name="search"
      id="search"
      placeholder="Search..."
    />
  );
};

export default SearchBar;
