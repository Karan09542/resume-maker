import React from "react";
import RasionRight from "./RasionRight";
import RasionLeft from "./RasionLeft";
import RasionInput from "./RasionInput";

const Rasion = () => {
  const [scale, setScale] = React.useState(1);
  const [isRasionInputOpen, setIsRasionInputOpen] = React.useState(false);
  const [isHint, setIsHint] = React.useState(false);
  return (
    <div className="relative flex justify-center mt-10">
      <div className="absolute left-0 z-10">
        {isRasionInputOpen ? (
          <RasionInput
            scale={scale}
            setScale={setScale}
            isHint={isHint}
            setIsHint={setIsHint}
            setIsRasionInputOpen={setIsRasionInputOpen}
          />
        ) : (
          <button
            className="absolute -top-9 left-1 px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95 text-xs text-nowrap"
            onClick={() => setIsRasionInputOpen(true)}
          >
            रासन इनपुट
          </button>
        )}
      </div>
      <RasionLeft scale={scale} A4size={"180mm"} />
      <RasionRight isHint={isHint} scale={scale} A4size={"145.2mm"} />
    </div>
  );
};

export default Rasion;
