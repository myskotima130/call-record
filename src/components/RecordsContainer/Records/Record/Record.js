import React, {useState, useRef} from 'react';
import PlayPassive from '../../../../SVG/PlayPassive/PlayPassive';
import styles from './Record.css';

const Record = ({ record }) => {
  const audioRef = useRef()
  const [currentTime, setCurrentTime] = useState(0);

  const onClickPlay = () => {
    console.log(audioRef);

    audioRef.current.play();

    if(audioRef.current){
    audioRef.current.ontimeupdate = () => {
      if(audioRef.current.currentTime && audioRef.current.duration) {
        setCurrentTime(audioRef.current.currentTime/audioRef.current.duration * 100);
        console.log(audioRef.current.currentTime/audioRef.current.duration * 100);
      }
    }
  }
  };

  return (
    <div className={styles.itemWrapper}>
      <p className={styles.title}>{record.title}</p>
      <audio
        ref={audioRef}
        src={URL.createObjectURL(record.blob)}
      ></audio>
      <progress className={styles.statusBar} value={currentTime} max={100} >{currentTime}</progress>
      <div onClick={onClickPlay}><PlayPassive /></div>
    </div>
  )
}

export default Record
