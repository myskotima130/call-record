import React, { useState, useEffect } from "react";
import moment from "moment";
import db from "../../db/indexedDB";
import PlayBig from "../../SVG/PlayBig/PlayBig";
import { TitlePrompt, Softkey } from "../../components";
import uuid from "uuid/v4";
import styles from "./CallReceive.css";

export const CallReceive = ({
  callInfo,
  mediaRecorder,
  addRecord,
  Telephony
}) => {
  const [isShownPrompt, setIsShownPrompt] = useState(false);
  const [title, setTitle] = useState(`Record ${moment().format("D/MMM")}`);
  const [record, setRecord] = useState("Record");
  const [startRecord, setStartRecord] = useState(null);
  const [callButton, setCallButton] = useState("Start recording");

  const [call, setCall] = useState(null);

  let chunks = [];
  const onCall = () => {
    setCall(
      // eslint-disable-next-line no-undef
      new MozActivity({
        name: "dial",
        data: {
          number: callInfo.callerNumber
        }
      })
    );

    call.onsuccess = function() {
      console.log("onsuccess call", this.result);
    };

    setStartRecord(moment());
    setCallButton("Stop recording");

    // while (call.readyState !== "done") {}
    // onStop();
  };

  useEffect(() => {
    if (call.readyState === "done") {
      onStop();
    }
  }, [call]);

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
