import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function TimePicker({ editMode, recipe, setCookTime }) {
  const dispatch = useDispatch();

  let defaultCookTime;

  if (editMode) {
    defaultCookTime = recipe.cook_time.split(":");
    console.log(defaultCookTime);
  }

  const [hours, setHours] = useState(editMode ? defaultCookTime[0] : "0");
  const [minutes, setMinutes] = useState(editMode ? defaultCookTime[1] : "00");
  const [seconds, setSeconds] = useState(editMode ? defaultCookTime[2] : "00");

  useEffect(() => {
    const cook_time = `${hours}:${minutes}:${seconds}`;
    setCookTime(cook_time);
  }, [hours, minutes, seconds]);

  return (
    <div>
      <h1 className="text-lg leading-6 font-medium text-gray-900">Cook Time</h1>
      <p className="mt-1 text-sm text-gray-500">
        How long is it going to take to cook?
      </p>
      <div className="mt-1 block p-1 w-[168px] shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm border border-gray-300 rounded-md">
        <div className="flex justify-center">
          <select
            name="hours"
            className="bg-transparent text-xl appearance-none outline-none text-center flex self-center px-2"
            onChange={(e) => setHours(e.target.value)}
            value={hours}
          >
            {Array.from({ length: 13 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <span className="text-xl">:</span>
          <select
            name="minutes"
            className="bg-transparent text-xl appearance-none outline-none text-center flex self-center px-4"
            onChange={(e) => setMinutes(e.target.value)}
            value={minutes}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <span className="text-xl">:</span>
          <select
            name="seconds"
            className="bg-transparent text-xl appearance-none outline-none text-center flex self-center pl-4 pr-2"
            onChange={(e) => setSeconds(e.target.value)}
            value={seconds}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
