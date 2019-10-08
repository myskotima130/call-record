import React from "react";
import { TitlePrompt } from "../TitlePrompt/TitlePrompt";
import styles from "./Options.css";

export const Options = ({ text = "Rename your record", setTitle }) => {
  return (
    <div className={styles.wrapper}>
      <TitlePrompt text={text} setTitle={setTitle} />
      <h3 className={styles.item}>Delete record</h3>
      <h3 className={styles.item}>Save to device</h3>
    </div>
  );
};
