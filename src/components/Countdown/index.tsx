import React, { useId, useRef, useState } from "react";

// https://stackoverflow.com/a/41297064/13435001
const toMilliseconds = (hrs: number, min?: number, sec?: number) =>
  (hrs * 60 * 60 + (min || 0) * 60 + (sec || 0)) * 1000;

const Countdown = () => {
  const [seconds, setSeconds] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [isPaused, setIsPaused] = useState(false);
  const inervalRef = useRef(0);

  const calcHoursMinutesSeconds = (left: number, onComplete?: () => void) => {
    const milliS =
      toMilliseconds(
        parseInt(hours || "0"),
        parseInt(minutes || "0"),
        parseInt(seconds || "0"),
      ) - left;

    if (milliS <= 0) {
      resetHandler();
      onComplete && onComplete();
      return;
    }

    const hr = milliS / (1000 * 60 * 60);
    const min = Number("0." + hr.toString().split(".")[1]) * 60;
    const sec = (
      Number("0." + (min.toString().split(".")[1] || 0)) * 60
    ).toFixed(0);

    const formattedSecond = Number(sec || 0);
    const formattedMinute = Number(min.toString().split(".")[0]) || 0;
    const formattedHours = Number(hr.toString().split(".")[0]) || 0;

    setSeconds(
      formattedSecond < 10 ? `0${formattedSecond}` : formattedSecond.toString(),
    );
    setMinutes(
      formattedMinute < 10 ? `0${formattedMinute}` : formattedMinute.toString(),
    );
    setHours(
      formattedHours < 10 ? `0${formattedHours}` : formattedHours.toString(),
    );
  };

  const startCountDown = () => {
    if (seconds === "" && minutes === "" && hours === "") return;

    // format
    calcHoursMinutesSeconds(0);
    setIsPaused(true);

    let millisecondsDeducted = 1000;
    inervalRef.current = setInterval(() => {
      calcHoursMinutesSeconds(millisecondsDeducted, () => {
        console.log("Completed");
      });
      millisecondsDeducted += 1000;
    }, 1000);
  };

  const resetHandler = () => {
    pauseHandler();
    setSeconds("");
    setMinutes("");
    setHours("");
  };

  const pauseHandler = () => {
    setIsPaused(false);
    clearInterval(inervalRef.current);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 text-center">
      <div className="bg-white rounded-lg px-20 py-12">
        <h1 className="text-center font-bold text-2xl">Countdown Timer</h1>

        <div
          className={`flex justify-center items-center [&>span]:text-3xl [&>span]:translate-y-3 mt-9 gap-4 ${
            isPaused ? "pointer-events-none" : ""
          }`}
        >
          <Input
            label="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <span>:</span>
          <Input
            label="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <span>:</span>
          <Input
            label="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={resetHandler}
            className="outline-none hover:opacity-80 px-8 py-2.5 grow bg-red-500 rounded-md text-white"
          >
            Reset
          </button>
          <button
            onClick={!isPaused ? startCountDown : pauseHandler}
            className={`outline-none hover:opacity-80 px-8 py-2.5 grow rounded-md text-white ${
              isPaused ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            {!isPaused ? "Start" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countdown;

type InputProps = {
  label: string;
} & React.ComponentProps<"input">;
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    const id = useId();
    return (
      <div>
        <label
          htmlFor={id}
          className="font-medium text-base mb-1 block opacity-50"
        >
          {label}
        </label>
        <input
          type="number"
          id={id}
          className="text-[40px] w-[80px] rounded-md outline-none border border-slate-100 focus:border-slate-200 py-3 text-center"
          placeholder="00"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);
