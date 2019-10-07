import React, { useState, useEffect } from "react";
import { RecordsContainer, Search, Softkey, CallReceive } from "./components";
import db from "./db/indexedDB";
import styles from "./App.css";

const App = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
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
      };
    } else {
      setCallInfo({
        callerName: "test name2",
        callerNumber: "+380988367942"
      });
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
          <Search placeholder={`Search ${status}`} />
          <RecordsContainer records={records} onDelete={onDelete} />

          <Softkey
            left={softkey.left}
            center="select"
            // onKeyCenter={onKeyCenter}
            right={softkey.right}
            // onKeyRight={onKeyRight}
          />
        </div>
      )}
    </div>
  );
};

export default App;
