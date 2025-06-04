import React from "react";
import RasionRight from "./RasionRight";
import RasionLeft from "./RasionLeft";
import RasionInput from "./RasionInput";
import FullRasion from "./components/FullRasion";

const Rasion = () => {
  const [scale, setScale] = React.useState(1);
  const [isRasionInputOpen, setIsRasionInputOpen] = React.useState(false);
  const [isHint, setIsHint] = React.useState(false);
  return (
    <div>
      <div style={{margin: "10px"}} className="z-10 print-hidden">
        {isRasionInputOpen ? (
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

            <RasionInput
              scale={scale}
              setScale={setScale}
              isHint={isHint}
              setIsHint={setIsHint}
              setIsRasionInputOpen={setIsRasionInputOpen}
            />
          </div>
        ) : (
          <button
            className="fixed top-2 left-1/2 -translate-x-1/2 px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95 text-xs text-nowrap"
            onClick={() => setIsRasionInputOpen(true)}
          >
            रासन इनपुट
          </button>
        )}
        <button style={{ backgroundColor: "green", color: "white" , marginLeft: "10px", padding: "5px 10px", borderRadius: "5px", border: "none"}} onClick={() => window.print()}>
          print
        </button>
      </div>
      <FullRasion />
    </div>
  );
  // return (
  //   <div className="relative flex justify-center gap-[4.5cm] mt-[2.1cm] mb-[3.8cm]">
  //     <div className="z-10 print:hidden">
  //       {isRasionInputOpen ? (
  //         <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

  //           <RasionInput
  //             scale={scale}
  //             setScale={setScale}
  //             isHint={isHint}
  //             setIsHint={setIsHint}
  //             setIsRasionInputOpen={setIsRasionInputOpen}
  //           />
  //         </div>
  //       ) : (
  //         <button
  //           className="fixed top-2 left-1/2 -translate-x-1/2 px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 active:scale-95 text-xs text-nowrap"
  //           onClick={() => setIsRasionInputOpen(true)}
  //         >
  //           रासन इनपुट
  //         </button>
  //       )}
  //     </div>
  //     {/* <RasionLeft scale={scale} A4size={"180mm"} />
  //     <RasionRight isHint={isHint} scale={scale} A4size={"145.2mm"} /> */}
  //     <FullRasion />
  //   </div>
  // );
};

export default Rasion;
