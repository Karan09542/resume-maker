import React from "react";
import { useRasionStore } from "../../../Store/Resume";

const RasionLeft = ({ scale, A4size }) => {
  const rasionData = useRasionStore((state) => state.rasionData);
  const familyMembers = rasionData?.familyMembers || [];
  const tableHeaders = ["स.क्र.", "नाम", "लिंग", "उम्र", "मुखिया से संबंध"];
  console.log(rasionData);

  return (
    <div style={{ width: A4size }}>
      <div className="mx-auto w-fit text-center h-full">
        <div
          style={{ fontSize: `${14 * scale}px`, lineHeight: `${20 * scale}px` }}
          className="font-bold text-sm w-[5cm] mx-auto bg-[#a8a8a8] print-area p-2 rounded"
        >
          परिवार के सदस्यों का विवरण
        </div>
        {/* family members */}
        <table
          style={{ marginTop: `${0.7 * scale}cm`, fontSize: `${14 * scale}px` }}
        >
          <tr
            style={{ lineHeight: `${2.5 * scale}` }}
            className="border-b border-black"
          >
            {tableHeaders.map((header, index) => (
              <th key={header} className="min-w-[80px]">
                {header}
              </th>
            ))}
          </tr>
          {familyMembers.map((member, index) => (
            <tr
              key={member.name + index}
              style={{ lineHeight: `${2.5 * scale}` }}
            >
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.gender}</td>
              <td>{member.age}</td>
              <td>{member.relation}</td>
            </tr>
          ))}
        </table>
        {/* signature of mukhiya */}
        <div
          style={{ fontSize: `${14 * scale}px` }}
          className="relative text-right font-semibold h-full"
        >
          <div
            style={{ position: "absolute", bottom: `${124 * scale}px` }}
            className="bottom-60 right-0"
          >
            <p>परिवार के मुखिया का हस्ताक्षर/अंगुठे का निशान</p>
            <p style={{ marginTop: `${32 * scale}px`, fontSize: `${13 * scale}px` }} className="">
              {rasionData?.signatureOf ? (
                <span className="leading-">
                  {rasionData?.signatureOf?.split(",")[0]} <br />{" "}
                  <span>{rasionData?.signatureOf?.split(",")[1]}</span>{" "}
                </span>
              ) : (
                "सरपंच के हस्ताक्षर"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RasionLeft;
