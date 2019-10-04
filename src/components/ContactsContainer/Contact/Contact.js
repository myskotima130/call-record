import React from "react";
import uuid from "uuid/v4";
import CallPassive from "../../../SVG/CallPassive/CallPassive";
import db from "../../../db/indexedDB";
import styles from "./Contact.css";

const Contact = ({ contact, mediaRecorder, addRecord }) => {
  let chunks = [];
  const onCall = () => {
    mediaRecorder.start();
    console.log("recorder started");
  };

  const onStopClick = () => {
    mediaRecorder.stop();
    console.log("recorder stopped");

    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const title = prompt(
          "Enter a name for your record?",
          "My unnamed clip"
        );

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        const id = uuid();
        db.records.add({
          id,
          blob,
          title,
          name: contact.name,
          tel: contact.tel,
          date: new Date()
        });
        addRecord({
          id,
          blob,
          title,
          name: contact.name,
          tel: contact.tel,
          date: new Date()
        });
      };

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.tel}>{contact.tel}</p>
      </div>
      <div onClick={onCall}>
        <CallPassive />
      </div>
      <div
        onClick={onStopClick}
        className={styles.call}
        style={{ background: "red" }}
      ></div>
    </div>
  );
};

export default Contact;
