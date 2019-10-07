import React, { useState } from "react";
import uuid from "uuid/v4";
import moment from "moment";
import CallPassive from "../../../SVG/CallPassive/CallPassive";
import ChangeTitlePrompt from "../../ChangeTitlePrompt/ChangeTitlePrompt";
import db from "../../../db/indexedDB";
import styles from "./Contact.css";

const Contact = ({ contact, mediaRecorder, addRecord }) => {
  const [isShownPrompt, setIsShownPrompt] = useState(false);
  let chunks = [];
  let startRecord;

  const onCall = () => {
    mediaRecorder.start();
    startRecord = moment();
    console.log("recorder started");
  };

  const onStopClick = () => {
    mediaRecorder.stop();

    console.log("recorder stopped");

    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const duration = moment().diff(startRecord, "milliseconds");

        // setIsShownPrompt(true);

        const title = prompt(
          "Enter a name for your record?",
          "My unnamed clip"
        );

        // const title = "test";

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        const id = uuid();
        db.records.add({
          id,
          blob,
          title,
          name: contact.name,
          tel: contact.tel,
          date: new Date(),
          duration
        });
        addRecord({
          id,
          blob,
          title,
          name: contact.name,
          tel: contact.tel,
          date: new Date(),
          duration
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
      {isShownPrompt && (
        <div className={styles.prompt}>
          <ChangeTitlePrompt text="Set title of the record" />
        </div>
      )}
    </div>
  );
};

export default Contact;
