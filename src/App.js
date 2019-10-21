import React, { useState, useEffect } from "react";
import {
  RecordsContainer,
  Softkey,
  CallReceive,
  WelcomePage
} from "./components";
import db from "./db/indexedDB";
import styles from "./App.css";

const App = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [records, setRecords] = useState([]);
  const [telephonyCall] = useState(navigator.mozTelephony);
  const [callInfo, setCallInfo] = useState({
    callerNumber: "",
    callerName: ""
  });
  const [softkey, setSoftkey] = useState({
    left: "",
    center: "",
    right: ""
  });

  useEffect(() => {
    if (telephonyCall) {
      telephonyCall.onincoming = e => {
        const requestName = navigator.mozContacts.find({
          filterBy: ["tel"],
          filterValue: e.call.id
        });

        requestName.onsuccess = function() {
          setCallInfo({
            callerName: this.result.name,
            callerNumber: e.call.id
          });
        };

        requestName.onerror = function() {
          setCallInfo({
            callerName: "Unknown",
            callerNumber: e.call.id
          });
        };
      };
    } else {
      // setCallInfo({
      //   callerName: "Anastasia Malikova",
      //   callerNumber: "+380997856378"
      // });
    }
  }, [telephonyCall]);

  const addRecord = record => {
    setRecords([...records, record]);
    setCallInfo({
      callerName: "",
      callerNumber: ""
    });
  };

  const onDelete = id => {
    db.records.delete(id);
    setRecords([...records.filter(record => record.id !== id)]);
  };

  useEffect(() => {
    db.records.toArray(data => setRecords(data));

    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia =
        navigator.getUserMedia || navigator.mozGetUserMedia;
    }

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(
        stream => {
          setMediaRecorder(new MediaRecorder(stream));
        },
        error => console.error(error)
      );
    } else {
      console.error("getUserMedia is not supported");
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {callInfo.callerNumber ? (
        <CallReceive
          callInfo={callInfo}
          mediaRecorder={mediaRecorder}
          addRecord={addRecord}
          setSoftkey={setSoftkey}
        />
      ) : (
        <div>
          {records.length ? (
            <React.Fragment>
              <RecordsContainer
                setSoftkey={setSoftkey}
                softkey={softkey}
                contacts={records}
                onDelete={onDelete}
                isShowOptions={isShowOptions}
                setIsShowOptions={setIsShowOptions}
              />
              <Softkey
                left={softkey.left}
                onKeyLeft={softkey.onKeyLeft}
                center={softkey.center}
                onKeyCenter={softkey.onKeyCenter}
                right={softkey.right}
                onKeyRight={softkey.onKeyRight}
              />
            </React.Fragment>
          ) : (
            <WelcomePage />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
