import React, { useState, useEffect } from "react";
import { ClipContainer } from "./components";
import db from "./db/indexedDB";
import "./App.css";

const App = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [records, setRecords] = useState([]);
  const onDelete = recordUrl => {
    db.records.delete(recordUrl);
    setRecords([...records.filter(record => record.url !== recordUrl)]);
  };

  let chunks = [];
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

  const onStartClick = () => {
    mediaRecorder.start();
    console.log("recorder started");
  };
  const onStopClick = () => {
    mediaRecorder.stop();
    console.log("recorder stopped");
  };
  if (mediaRecorder) {
    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const clipName = prompt(
        "Enter a name for your record?",
        "My unnamed clip"
      );

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const url = window.URL.createObjectURL(blob);

      setRecords([...records, { url, title: clipName }]);
      db.records.add({ url, title: clipName });

      console.log("recorder stopped");
    };

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  }

  return (
    <div className="App">
      <h1>Call Record</h1>
      <button onClick={onStartClick}>Start</button>
      <button onClick={onStopClick}>Stop</button>
      {records && <ClipContainer records={records} onDelete={onDelete} />}
    </div>
  );
};

export default App;
