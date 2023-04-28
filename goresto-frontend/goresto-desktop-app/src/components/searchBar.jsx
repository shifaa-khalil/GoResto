import React from "react";
import "../App.css";
import styles from "../css/searchBar.module.css";

const SearchBar = (props) => {
  return (
    <div className={`${props.className} ${styles.searchBar}`}>
      <input type="text" placeholder="search anything" />
    </div>
  );
};

export default SearchBar;
