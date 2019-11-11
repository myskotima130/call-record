/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import uuid from "uuid/v4";
import moment from "moment";
import CallPassive from "../../../../SVG/CallPassive/CallPassive";
import db from "../../../../db/indexedDB";
import styles from "./Contact.css";

const Contact = ({
  setSoftkey,
  softkey,
  setTitle,
  contact,
  mediaRecorder,
  addRecord,
  setIsShownPrompt,
  isShownPrompt,
  title
}) => {
  let chunks = [];
  let record;
  let startRecord;

  const onCall = () => {
    // setTimeout(() => {
    //   onStop();
    // }, 12000);

    // setSoftkey({
    //   center: "Save",
    //   onKeyCenter: onSave,
    //   right: "Clear",
    //   onKeyRight: () => setTitle("")
    // });

    console.log("start mozActivity");

    // eslint-disable-next-line no-undef
    const call = new MozActivity({
      name: "dial",
      data: {
        number: contact.tel
      }
    });

    call.onsuccess = function() {
      console.log("mediaRecorder start");
      mediaRecorder.start();
      startRecord = moment();
    };

    const tel = navigator.mozTelephony;

    tel.oncallschanged = e => {
      console.log("oncallschanged", e.call);
      if (e.call.state === "disconnected") {
        console.log("disconnected");
        console.log(mediaRecorder);

        mediaRecorder.stop();
        // setIsShownPrompt(true);

        mediaRecorder.onstop = () => {
          console.log("mediaRecorder onstop");
          const duration = moment().diff(startRecord, "milliseconds");
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];

          const id = uuid();

          console.log("create record");

          record = {
            id,
            blob,
            name: contact.name,
            tel: contact.tel,
            date: new Date(),
            duration: duration < 1000 ? 1000 : duration
          };

          db.records.add({
            ...record,
            title
          });

          addRecord({
            ...record,
            title
          });
          console.log("saved to storage");
        };

        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data);
        };
      }
    };
  };

  // const onStop = () => {};

  // const onSave = () => {
  //   console.log("save", testRecord);

  //   // setIsShownPrompt(false);
  // };

  return (
    <div
      className={styles.wrapper}
      nav-selectable="true"
      contactcall="true"
      onClick={onCall}
    >
      <div>
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.tel}>{contact.tel}</p>
      </div>
      <div onClick={onCall}>
        <CallPassive />
      </div>
    </div>
  );
};

export default Contact;
