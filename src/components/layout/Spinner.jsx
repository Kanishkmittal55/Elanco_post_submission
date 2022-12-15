import React from "react";
import spinner from "./assets/spinner.gif";
function Spinner({ size }) {
  return (
    <div className="w-100 mt-20">
      <img
        width={size}
        className="text-centre mx-auto"
        src={spinner}
        alt="Loading..."
      />
    </div>
  );
}

export default Spinner;