import React, { useState, useEffect } from "react";

const Countdown = ({
  endTime,
  className,
}: {
  endTime: number;
  className: string;
}) => {
  const [timeLeft, setTimeLeft] = useState(endTime * 1000 - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime * 1000 - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  });

  if (timeLeft < 0) {
    return <p className={className}>The auction has ended!</p>;
  }

  const hours = Math.floor(timeLeft / 3600 / 1000);
  const minutes = Math.floor(timeLeft / 60 / 1000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;

  return (
    <p className={className}>
      {hours}h {minutes}m {seconds}s
    </p>
  );
};

export default Countdown;
