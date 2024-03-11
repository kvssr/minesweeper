import React, { useEffect, useState } from "react";

const Timer = ({ gameState }) => {
  let time = 0;
  const [timeR, setTimeR] = useState(time);

  useEffect(() => {
    if (gameState === "start") {
      const interval = setInterval(() => {
        // console.log("🚀 ~ useEffect ~ interval start:", time, interval);
        time++;
        setTimeR(time);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [gameState]);
  return (
    <div>
      <p>{timeR}</p>
    </div>
  );
};

export default Timer;
