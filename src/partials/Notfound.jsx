import React from "react";
import Notfound404 from "/Notfound404.gif";
const Notfound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img className="h-[60%]" src={Notfound404} alt="" />
    </div>
  );
};

export default Notfound;
