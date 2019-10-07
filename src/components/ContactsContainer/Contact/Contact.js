import React from "react";

import styles from "./Contact.css";

const Contact = ({ contact, mediaRecorder, addRecord }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.tel}>{contact.tel}</p>
      </div>
    </div>
  );
};

export default Contact;
