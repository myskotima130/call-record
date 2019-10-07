import React, { useRef, useState, useEffect } from "react";
import PlayPassive from "../../../../SVG/PlayPassive/PlayPassive";
import Play from "../../../../SVG/Play/Play";
import Stop from "../../../../SVG/Stop/Stop";
import moment from "moment";
import styles from "./Record.css";

const Record = ({ record }) => {
  const audioRef = useRef();
  const progressRef = useRef();
  const timeRef = useRef();
  const [button, setButton] = useState({
    type: "passive",
    component: <PlayPassive />,
    value: 0
  });

  useEffect(() => {
    if (button.type === "stop") {
      audioRef.current.currentTime = button.value;
      console.log(audioRef.current.currentTime);

      audioRef.current.play();

      console.log("play(resume)");
    } else if (button.type === "play") {
      console.log(button.value);
      audioRef.current.currentTime = button.value;
      audioRef.current.pause();
      console.log("pause()");
    }
  }, [button]);

  const onClickPlay = () => {
    console.log(audioRef);

    if (button.type === "passive" || button.type === "play") {
      setButton({
        type: "stop",
        component: <Stop />,
        value: button.value
      });
    } else if (button.type === "stop") {
      setButton({
        type: "play",
        component: <Play />,
        value: audioRef.current.currentTime
      });
    }

    audioRef.current.ontimeupdate = () => {
      progressRef.current.value = Math.ceil(
        (audioRef.current.currentTime / record.duration) * 100 * 1000
      );
      timeRef.current.value = `${audioRef.current.currentTime
        .toFixed(2)
        .toString()
        .replace(".", ":")}`;
      if (audioRef.current.ended) {
        progressRef.current.value = 100;
        timeRef.current.value = `${(record.duration / 1000)
          .toFixed(2)
          .toString()
          .replace(".", ":")}`;
      }
    };
  };

  return (
    <div className={styles.itemWrapper}>
      <div onClick={onClickPlay}>{button.component}</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{record.title}</h2>
          <h3 className={styles.fromNow}>{moment(record.date).fromNow()}</h3>
        </div>
        <audio ref={audioRef} src={URL.createObjectURL(record.blob)}></audio>
        <progress
          ref={progressRef}
          className={styles.statusBar}
          max={100}
        ></progress>
        <div className={styles.timeWrapper}>
          <input
            className={styles.currentTime}
            ref={timeRef}
            defaultValue="00:00"
            disabled
          />
          <h3 className={styles.duration}>
            {(record.duration / 1000)
              .toFixed(2)
              .toString()
              .replace(".", ":")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Record;
