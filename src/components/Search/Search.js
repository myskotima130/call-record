import React from "react";
import styles from "./Search.css";

export const Search = ({ placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <input type="text" placeholder={placeholder}></input>
    </div>
  );
};
