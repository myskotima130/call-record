import React from "react";
import SearchIcon from "../../SVG/SearchIcon/SearchIcon";
import styles from "./Search.css";

export const Search = ({ placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <SearchIcon />
        <input type="text" placeholder={placeholder}></input>
      </div>
    </div>
  );
};
