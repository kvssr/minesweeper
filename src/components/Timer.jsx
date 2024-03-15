import React, { useEffect, useRef, useState } from "react";

const Timer = ({ gameState }) => {
  let time = useRef(0);
  const [timeR, setTimeR] = useState(time.current);

  useEffect(() => {
    if (gameState === "pregame") time.current = 0;
    if (gameState === "playing") {
      const interval = setInterval(() => {
        // console.log("🚀 ~ useEffect ~ interval start:", time, interval);
        time.current++;
        setTimeR(time.current);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [gameState]);
  return (
    <div>
      <p>{("0000" + timeR).slice(-4)}</p>
    </div>
  );
};

export default Timer;
