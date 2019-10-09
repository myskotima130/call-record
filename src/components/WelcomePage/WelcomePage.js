import React from "react";
import WelcomeImg from "../../SVG/WelcomeImg/WelcomeImg";

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcom to TapRec recording calls app</h1>
      <WelcomeImg />
      <h3>Seems you didn`t record any calls</h3>
    </div>
  );
};

export default WelcomePage;
