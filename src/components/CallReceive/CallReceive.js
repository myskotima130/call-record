import React, { useState, useEffect } from "react";
import moment from "moment";
import db from "../../db/indexedDB";
import PlayBig from "../../SVG/PlayBig/PlayBig";
import { TitlePrompt } from "../TitlePrompt/TitlePrompt";
import uuid from "uuid/v4";
import styles from "./CallReceive.css";

export const CallReceive = ({
  callInfo,
  mediaRecorder,
  addRecord,
  setSoftkey
}) => {
  const [isShownPrompt, setIsShownPrompt] = useState(false);
  const [title, setTitle] = useState("Record");

  let chunks = [];
  let startRecord;

  const onCall = () => {
    mediaRecorder.start();
    startRecord = moment();
    console.log("recorder started");
  };

  const onStopClick = () => {
    setIsShownPrompt(true);
    mediaRecorder.stop();
    console.log("recorder stopped");
  };

  useEffect(() => {
    setSoftkey({
      left: "",
      center: "Start recording",
      right: "",
      onKeyCenter: onCall
    });

    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const duration = moment().diff(startRecord, "milliseconds");

        // const title = prompt(
        //   "Enter a name for your record?",
        //   "My unnamed clip"
        // );

        // const title = "test";

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        const id = uuid();
        db.records.add({
          id,
          blob,
          title,
          name: callInfo.callerName,
          tel: callInfo.callerNumber,
          date: new Date(),
          duration
        });
        addRecord({
          id,
          blob,
          title,
          name: callInfo.callerName,
          tel: callInfo.callerNumber,
          date: new Date(),
          duration
        });
      };

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };
    }
  }, [title]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <p>You are talking with</p>
        <p>{callInfo.callerName}</p>
      </div>
      <div onClick={onCall}>
        <PlayBig />
      </div>
      <div className={styles.bottomLine} />
      <div
        onClick={onStopClick}
        className={styles.call}
        style={{ background: "red" }}
      ></div>
      {isShownPrompt && (
        <div className={styles.prompt}>
          <TitlePrompt
            text="Enter a name for your record"
            setTitle={setTitle}
            setSoftkey={setSoftkey}
          />
        </div>
      )}
    </div>
  );
};
