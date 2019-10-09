import React from "react";
import styles from "./TitlePrompt.css";

export const TitlePrompt = ({ text, setTitle, value = "Record" }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.text}>{text}</h2>
      <input
        className={styles.input}
        type="text"
        onChange={e => setTitle(e.currentTarget.value)}
        value={value}
        nav-selectable="true"
        autoFocus
      ></input>
    </div>
  );
};
