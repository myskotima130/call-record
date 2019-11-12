/* eslint-disable no-undef */
/* eslint-disable no-use-before-define  */
import React from "react";
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
  let record;

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

    // console.log("start mozActivity");

    // eslint-disable-next-line no-undef
    // const call = new MozActivity({
    //   name: "dial",
    //   data: {
    //     number: contact.tel
    //   }
    // });

    // call.onsuccess = function() {
    //   console.log("mediaRecorder start", mediaRecorder);
    //   mediaRecorder.start();
    //   startRecord = moment();
    // };

    const tel = navigator.mozTelephony;

    // tel.dial(contact.tel).then(function(call) {
    //   console.log("dial from mozTelephony");

    //   call.onconnected = () => {
    //     console.log("mediaRecorder start from mozTelephony");
    //     mediaRecorder.start();
    //     startRecord = moment();
    //     console.log("mRecorder started", mediaRecorder);
    //   };
    // });

    // mediaRecorder.start(100);
    // startRecord = moment();
    // console.log("mediaRecorder started once");

    // mediaRecorder.onstop = () =>
    //   console.log("mediaRecorder before disconnected");

    // ------------------------------------------------------------------------------

    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia =
        navigator.getUserMedia || navigator.mozGetUserMedia;
    }

    let recorder;
    let startRecord;
    let chunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        console.log("devices", devices);

        const requests = [
          navigator.mediaDevices.getUserMedia({
            audio: { deviceId: { exact: devices[1].deviceId } }
          }),
          navigator.mediaDevices.getUserMedia({
            audio: { deviceId: { exact: devices[2], deviceId } }
          })
        ];

        Promise.all(requests).then(streams => {
          const ctx = new AudioContext();
          const dest = ctx.createMediaStreamDestination();

          streams.map(stream => {
            ctx.createMediaStreamSource(stream).connect(dest);
          });

          const mixedTracks = dest.stream.getTracks()[0];

          const stream = new MediaStream(mixedTracks);

          const recorder = new MediaRecorder(stream);

          recorder.addEventListener("dataavailable", e => {
            console.log("addEventListener finished record", e.data);
            chunks.push(e.data);

            const duration = moment().diff(startRecord, "milliseconds");
            const blob = new Blob(chunks, { type: "audio/wav; codecs=opus" });
            chunks = [];
            const id = uuid();

            record = {
              id,
              blob,
              name: contact.name,
              tel: contact.tel,
              date: new Date(),
              duration: duration < 1000 ? 1000 : duration
            };

            console.log(record);

            db.records.add({
              ...record,
              title
            });

            addRecord({
              ...record,
              title
            });
            console.log("saved to storage");

            console.log("recorder stopped", recorder);
          });

          console.log("Start recording");
          recorder.start();
          startRecord = moment();
        });
      });
    });

    // ------------------------------------------------------------------------------

    // setTimeout(() => {
    //   console.log("disconnected", recorder);

    //   recorder.stop();
    //   // setIsShownPrompt(true);
    // }, 3000);

    // tel.oncallschanged = e => {
    //   console.log("oncallschanged", recorder);
    //   if (e.call.state === "disconnected") {
    //     console.log("disconnected", recorder);

    //     recorder.stop();
    //   } else {
    // console.log("Start recording");
    // recorder.start();
    // startRecord = moment();
    //     }
    //   };
  };

  ////

  // mediaRecorder.start();
  //         console.log("mRecorder start", mediaRecorder);

  //         mediaRecorder.onstop = () => {
  //           console.log("mediaRecorder onstop", mediaRecorder);
  //           const duration = moment().diff(startRecord, "milliseconds");
  //           const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  //           chunks = [];

  //           const id = uuid();

  //           console.log("create record", duration);

  //           record = {
  //             id,
  //             blob,
  //             name: contact.name,
  //             tel: contact.tel,
  //             date: new Date(),
  //             duration: duration < 1000 ? 1000 : duration
  //           };

  //           db.records.add({
  //             ...record,
  //             title
  //           });

  //           addRecord({
  //             ...record,
  //             title
  //           });
  //           console.log("saved to storage");
  //         };

  //         mediaRecorder.ondataavailable = e => {
  //           chunks.push(e.data);
  //         };

  ///
  // const onStop = () => {};

  // const onSave = () => {
  //   console.log("save", testRecord);

  //   // setIsShownPrompt(false);
  // };

  return (
    <a
      className={styles.wrapper}
      nav-selectable="true"
      contactcall="true"
      onClick={onCall}
      href={`tel:${contact.tel}`}
    >
      <div>
        <p className={styles.name}>{contact.name}</p>
        <p className={styles.tel}>{contact.tel}</p>
      </div>
      <div onClick={onCall}>
        <CallPassive />
      </div>
    </a>
  );
};

export default Contact;
