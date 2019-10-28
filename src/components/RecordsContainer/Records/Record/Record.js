import React, { useRef, useState, useEffect } from "react";
import PlayPassive from "../../../../SVG/PlayPassive/PlayPassive";
import Play from "../../../../SVG/Play/Play";
import Stop from "../../../../SVG/Stop/Stop";
import { convertMS } from "../../../../helpers/convertMS";
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

      audioRef.current.play();

      console.log("play(resume)");
    } else if (button.type === "play") {
      audioRef.current.currentTime = button.value;
      audioRef.current.pause();
      console.log("pause()");
    }
  }, [button]);

  const onClickPlay = () => {
    if (button.type === "passive" || button.type === "play") {
      setButton({
        ...button,
        type: "stop",
        component: <Stop />
      });
    } else if (button.type === "stop") {
      setButton({
        type: "play",
        component: <Play />,
        value: audioRef.current.currentTime
      });
    }

    audioRef.current.ontimeupdate = () => {
      if (!audioRef.current.paused) {
        progressRef.current.value = Math.ceil(
          (audioRef.current.currentTime / record.duration) * 100 * 1000
        );
        timeRef.current.value = convertMS(
          Math.ceil(audioRef.current.currentTime) * 1000
        );
      }

      if (audioRef.current.ended) {
        progressRef.current.value = 100;
        timeRef.current.value = `${convertMS(record.duration)}`;
        setButton({
          type: "passive",
          component: <PlayPassive />,
          value: 0
        });
      }
    };
  };

  return (
    <div className={styles.itemWrapper} nav-selectable="true" record="true">
      <div onClick={onClickPlay}>{button.component}</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{record.title}</h2>
          <h3 className={styles.fromNow}>
            {moment(record.date)
              .fromNow()
              .replace(/min[a-z]+/gi, "min.")}
          </h3>
        </div>
        <audio ref={audioRef} src={URL.createObjectURL(record.blob)}></audio>
        <progress
          ref={progressRef}
          className={styles.statusBar}
          max={100}
          value={Math.ceil((button.value / record.duration) * 100 * 1000)}
        />
        <div className={styles.timeWrapper}>
          <input
            className={styles.currentTime}
            ref={timeRef}
            value={convertMS(Math.ceil(button.value) * 1000)}
            disabled
          />
          <h3 className={styles.duration}>{convertMS(record.duration)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Record;
