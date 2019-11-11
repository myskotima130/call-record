import React, { useEffect, useRef } from "react";
import styles from "./Softkey.css";

export const Softkey = ({
  left,
  onKeyLeft,
  center,
  onKeyCenter,
  right,
  onKeyRight,
  onArrowRight,
  onArrowLeft
}) => {
  const refLeft = useRef();
  const refCenter = useRef();
  const refRight = useRef();
  const refArrowRigth = useRef();
  const refArrowLeft = useRef();

  const handleKeyDown = evt => {
    switch (evt.key) {
      case "SoftLeft": {
        refLeft.current.click();
        break;
      }

      case "Enter": {
        refCenter.current.click();
        break;
      }

      case "SoftRight": {
        refRight.current.click();
        break;
      }

      case "ArrowRight": {
        refArrowRigth.current.click();
        break;
      }

      case "ArrowLeft": {
        refArrowLeft.current.click();
        break;
      }

      default:
        return;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <label ref={refLeft} onClick={onKeyLeft} className={styles.left}>
        {left}
      </label>
      <label ref={refCenter} onClick={onKeyCenter} className={styles.center}>
        {center}
      </label>
      <label ref={refRight} onClick={onKeyRight} className={styles.right}>
        {right}
      </label>
      <div ref={refArrowRigth} onClick={onArrowRight} />
      <div ref={refArrowLeft} onClick={onArrowLeft} />
    </div>
  );
};
