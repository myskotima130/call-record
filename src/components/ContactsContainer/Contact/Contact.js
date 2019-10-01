import React from "react";
import styles from "./Contact.css";

const Contact = ({ contact, mediaRecorder }) => {
  const onCall = () => {
    mediaRecorder.start();
    console.log("recorder started");
  };

  const onStopClick = () => {
    mediaRecorder.stop();
    console.log("recorder stopped");
  };

  return (
    <div key={contact.tel} className={styles.wrapper}>
      <div>
        <p>{contact.name}</p>
        <p>{contact.tel}</p>
      </div>
      <button onClick={onCall}>call</button>
    </div>
  );
};

export default Contact;
