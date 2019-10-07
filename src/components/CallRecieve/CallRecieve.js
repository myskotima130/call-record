import React from "react";
import styles from "./CallRecieve";

const CallRecieve = ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <p>You are talking with</p>
      <p>{name}</p>
    </div>
  );
};

export default CallRecieve;
