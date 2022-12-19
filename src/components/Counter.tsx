import React, { useReducer } from "react";

// type InitialValu
const reducer = (
  state: number,
  action: "increment" | "decrement" | "reset",
) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <p>{state}</p>
      <br />
      <button onClick={() => dispatch("increment")}>Increment</button>
      <br />
      <button onClick={() => dispatch("decrement")}>Decrement</button>
      <br />
      <button onClick={() => dispatch("reset")}>Rests</button>
      <br />
    </div>
  );
};

export default Counter;
