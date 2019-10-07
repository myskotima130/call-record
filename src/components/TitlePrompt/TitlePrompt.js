import React from "react";
import styles from "./TitlePrompt.css";

export const TitlePrompt = ({ text, setTitle }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{text}</h2>
      <input
        className={styles.input}
        type="text"
        defaultValue="Record"
        onChange={e => setTitle(e.currentTarget.value)}
      ></input>
    </div>
  );
};
