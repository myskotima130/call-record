import React, { useRef, useState, useEffect } from "react";
import PlayPassive from "../../../../SVG/PlayPassive/PlayPassive";
import Play from "../../../../SVG/Play/Play";
import Stop from "../../../../SVG/Stop/Stop";
import Button from "./Button/Button";
import styles from "./Record.css";

const Record = ({ record }) => {
  const audioRef = useRef();
  const progressRef = useRef();
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
      console.log(audioRef.current.currentTime);

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
      if (audioRef.current.ended) {
        progressRef.current.value = 100;
      }
    };
  };

  return (
    <div className={styles.itemWrapper}>
      <p className={styles.title}>{record.title}</p>
      <audio ref={audioRef} src={URL.createObjectURL(record.blob)}></audio>
      <progress
        ref={progressRef}
        className={styles.statusBar}
        max={100}
        value={Math.ceil((button.value / record.duration) * 100 * 1000)}
      ></progress>
      <div onClick={onClickPlay}>{button.component}</div>
    </div>
  );
};

export default Record;
