import React from "react";
import loader1 from "/loader1.gif";
const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[50%]" src={loader1} alt="loader" />
    </div>
  );
};

export default Loader;
