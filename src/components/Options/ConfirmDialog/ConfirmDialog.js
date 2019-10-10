import React from "react";
import styles from "./ConfirmDialog.css";

const ConfirmDialog = ({ text }) => {
  return <div className={styles.wrapper}>{text}</div>;
};

export default ConfirmDialog;
