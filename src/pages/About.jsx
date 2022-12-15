import React from "react";

function About() {
  return (
    <>
    <div>

      <div className=" w-[100vw] h-[60vh] text-2xl font-light flex flex-col gap-5 items-center justify-center ">
        <div> Welcome to Elanco Applications and Resource Search Terminal</div>
        <div>See more of my Projects at <a href="https://www.millionairethinking.co.uk/" target="_blank" className="text-blue-800">www.millionairethinking.co.uk</a></div>
      </div>


    </div>
      <div className="text-lg text-black-400 flex flex-col-reverse "> 
        Version 1.0.0
      </div>

      </>
  );
}

export default About;
