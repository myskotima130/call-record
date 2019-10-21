import React, { useState } from "react";
import moment from "moment";
import db from "../../db/indexedDB";
import PlayBig from "../../SVG/PlayBig/PlayBig";
import { TitlePrompt, Softkey } from "../../components";
import uuid from "uuid/v4";
import styles from "./CallReceive.css";

export const CallReceive = ({ callInfo, mediaRecorder, addRecord }) => {
  const [isShownPrompt, setIsShownPrompt] = useState(false);
  const [title, setTitle] = useState(`Record ${moment().format("D/MMM")}`);
  const [record, setRecord] = useState("Record");
  const [callButton, setCallButton] = useState("Start recording");

  let chunks = [];
  let startRecord;
  const onCall = () => {
    mediaRecorder.start();
    startRecord = moment();
    setCallButton("Stop recording");
  };

  const onStop = () => {
    mediaRecorder.stop();
    setIsShownPrompt(true);

    if (mediaRecorder) {
      mediaRecorder.onstop = () => {
        const duration = moment().diff(startRecord, "milliseconds");

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];

        const id = uuid();
        setRecord({
          id,
          blob,
          name: callInfo.callerName,
          tel: callInfo.callerNumber,
          date: new Date(),
          duration: duration < 1000 ? 1000 : duration
        });
      };

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };
    }
  };

  const onSave = () => {
    db.records.add({
      ...record,
      title
    });

    addRecord({
      ...record,
      title
    });
  };

  return (
    <div className={styles.wrapper}>
      {isShownPrompt ? (
        <div className={styles.prompt}>
          <TitlePrompt
            text="Enter a name for your record"
            setTitle={setTitle}
            value={title}
          />
        </div>
      ) : (
        <React.Fragment>
          <div className={styles.textWrapper}>
            <p>You are talking with</p>
            <p>{callInfo.callerName}</p>
          </div>
          <PlayBig />
          <div className={styles.bottomLine} />
        </React.Fragment>
      )}
      <Softkey
        left=""
        center={isShownPrompt ? "Save" : callButton}
        onKeyCenter={
          isShownPrompt
            ? onSave
            : callButton === "Start recording"
            ? onCall
            : onStop
        }
        right={isShownPrompt && "Clear"}
        onKeyRight={() => setTitle("")}
      />
    </div>
  );
};
