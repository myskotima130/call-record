import React from "react";
import styles from "./ChangeTitlePrompt.css";

const ChangeTitlePrompt = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{text}</h2>
      <input className={styles.input} type="text" defaultValue="Record"></input>
    </div>
  );
};

export default ChangeTitlePrompt;
